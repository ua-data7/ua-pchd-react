import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
    <BrowserRouter>
        <Switch>
            <AppliedRoute path="/" exact component={Landing} props={childProps} />
            <AppliedRoute path="/login" exact component={Login} props={childProps} />
        </Switch>
    </BrowserRouter>