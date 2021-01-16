const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const axios = require("axios");
const dotenv = require("dotenv");
const conn = require("./connection.js");
const bcrypt = require("bcrypt");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dotenv.config();

app.use(express.static(path.join(__dirname, "build")));

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
  const data = req.body;
  const hashedPwd = bcrypt.hashSync(data.password, parseInt(process.env.SALT));
  const users = {
    username: data.username,
    password: hashedPwd,
  };
  conn.query(
    `SELECT * FROM users WHERE username = '${users.username}' AND password = '${hashedPwd}'`,
    (err) => {
      if (err) {
        return res.send({
          status: 500,
          redirect: "/error",
          message: err.message,
        });
      } else {
        return res.send({
          redirect: "/tournament",
          message: "Successfully signed in",
        });
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

  return res.send(JSON.stringify(photos));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
