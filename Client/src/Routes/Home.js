import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";

const SigninContainer = styled.div`
  position: absolute;
  padding: 20px 20px;
`;

const Home = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post("/signin", {
        username: data.username,
        password: data.password,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <SigninContainer>
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
    </SigninContainer>
  );
};

export default Home;
