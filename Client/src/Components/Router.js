import React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import History from "../Routes/History";
import Tournament from "../Routes/Tournament";
import Register from "../Routes/Register";

const Router = () => (
  <HashRouter>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/history" exact component={History} />
        <Route path="/tournament" exact component={Tournament} />
        <Route path="/register" exact component={Register} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </HashRouter>
);

export default Router;
