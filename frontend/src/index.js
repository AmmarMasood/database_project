import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Login from "./views/Auth/Login";
import ManagerSignup from "./views/Auth/ManagerSignup";
import EmployeeSignup from "./views/Auth/EmployeeSignup";
import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/material-dashboard-react" component={Login} />
      <Route exact path="/" component={Login} />
      <Route exact path="/signup/manager" component={ManagerSignup} />
      <Route exact path="/signup/employee" component={EmployeeSignup} />
      <Route path="/admin" component={Admin} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
