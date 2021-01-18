const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const axios = require("axios");
const conn = require("./connection.js");
const bcrypt = require("bcrypt");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.static(path.join(__dirname, "build")));

app.get("/history", async (_, res) => {
  conn.query(
    `SELECT u.username, h.winner FROM history AS h JOIN users AS u ON h.userid = u.userid`,
    (err, row) => {
      if (err) {
        res.send({
          status: 500,
          redirect: "/error",
          message: err.message,
        });
      } else {
        if (row && row.length) {
          const history = row.map((r) => ({
            username: r.username,
            winner: r.winner,
          }));
          res.send({
            status: 200,
            history,
          });
        }
      }
    }
  );
});

app.post("/winner", async (req, res) => {
  const winner = req.body.winner;
  const username = req.body.user;
  conn.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (err, row) => {
      if (err) {
        res.send({
          status: 500,
          redirect: "/error",
          message: err.message,
        });
      } else {
        if (row && row.length) {
          const userid = parseInt(row[0].userid);
          const history = {
            userid,
            winner,
          };
          conn.query(`INSERT INTO history SET ?`, history, (err) => {
            if (err) {
              res.send({
                status: 500,
                redirect: "/error",
                message: err.message,
              });
            } else {
              res.send({
                redirect: "/history",
                message: "Successfully recorded the result",
              });
            }
          });
        } else {
          res.send({
            status: 500,
            redirect: "/error",
            message: "User doesn't exist in database",
          });
        }
      }
    }
  );
});

app.post("/member", (req, res) => {
  const data = req.body;
  const hashedPwd = bcrypt.hashSync(data.password, parseInt(process.env.SALT));
  const users = {
    username: data.username,
    password: hashedPwd,
  };
  conn.query(`INSERT INTO users SET ?`, users, (err) => {
    if (err) {
      return res.send({
        status: 500,
        redirect: "/error",
        message: err.message,
      });
    } else {
      return res.send({
        redirect: "/tournament",
        message: "Successfully registered",
      });
    }
  });
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  conn.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (err, row) => {
      if (err) {
        res.send({
          status: 500,
          redirect: "/error",
          message: err.message,
        });
      } else {
        if (
          row &&
          row.length &&
          bcrypt.compareSync(password, row[0].password)
        ) {
          res.send({
            redirect: "/tournament",
            message: "Successfully signed in",
          });
        } else {
          res.send({
            status: 500,
            redirect: "/signin",
            message: "Incorrect username or password",
          });
        }
      }
    }
  );
});

app.get("/photos", async (_, res) => {
  const photoUrl = process.env.PHOTO_URL;
  const config = {
    method: "get",
    url: photoUrl,
    headers: {},
  };

  const photos = await axios(config)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });

  return res.send(photos);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
