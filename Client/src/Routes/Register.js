import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const RegisterContainer = styled.div`
  position: absolute;
  padding: 20px 20px;
`;

const Register = () => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post("/member", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.data.redirect) {
          history.push(res.data.redirect, { username: data.username });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <RegisterContainer>
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
        <button type="submit">Register</button>
      </form>
    </RegisterContainer>
  );
};

export default Register;
