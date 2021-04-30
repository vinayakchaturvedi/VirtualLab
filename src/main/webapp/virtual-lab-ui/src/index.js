import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

ReactDOM.render(<App/>, document.getElementById('root'));
/*

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/rtl" component={RTL} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    </Router>,
    document.getElementById("root")
);*/
