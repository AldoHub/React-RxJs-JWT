import React from "react";
import { Switch, Route } from "react-router-dom";

//components
import Main from "./components/Main";
import Login from "./components/Login";

const Routes = () => (

    <Switch>
        <Route exact path="/" component = {Main} />
        <Route exact path="/login" component = {Login} />   
    </Switch>

);

export default Routes;