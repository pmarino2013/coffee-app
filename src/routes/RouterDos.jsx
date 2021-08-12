import React from "react";
import { Switch, Route } from "react-router-dom";
import CoffeeNav from "../components/CoffeeNav";
import Error404 from "../pages/Error404";
import Inicio from "../pages/Inicio";

const RouterDos = () => {
  return (
    <>
      <CoffeeNav />
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route component={Error404} />
      </Switch>
    </>
  );
};

export default RouterDos;
