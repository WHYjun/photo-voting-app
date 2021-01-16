import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const SigninContainer = styled.div`
  position: absolute;
  padding: 20px 20px;
`;

const Home = () => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post("/signin", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.redirect) {
          history.push({
            pathname: res.data.redirect,
            state: { username: data.username },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SigninContainer>
      <p>Welcome to Photo Voting Application</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          type="text"
          placeholder="username"
          ref={register({
            required: true,
            minLength: {
              value: 3,
              message: "Min length is 3",
            },
          })}
        />
        <br />
        {errors.username && errors.username.message}
        <br />

        <label htmlFor="password">Password: </label>
        <input
          name="password"
          placeholder="Password"
          type="password"
          ref={register({
            required: true,
            minLength: {
              value: 8,
              message: "Min length is 8",
            },
          })}
        />
        <br />
        {errors.password && errors.password.message}
        <br />
        <button type="submit">Sign In</button>
      </form>
      <br />
      <p>If you don't have an account, please register to play!</p>
      <a href="register">Register</a>
    </SigninContainer>
  );
};

export default Home;
