import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import VaccineInterestForm from "./components/VaccineInterestForm";
import Login from "./components/Login";



export default ({ childProps }) =>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={VaccineInterestForm} props={childProps} />
            <Route path="/login" exact component={Login} props={childProps} />
        </Switch>
    </BrowserRouter>