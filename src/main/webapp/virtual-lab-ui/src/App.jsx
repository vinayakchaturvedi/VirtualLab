import React from "react";
import "./App.scss";
import IndexPanel from "./IndexPanel";
import StudentTerminal from "./StudentTerminal.jsx";
import {BrowserRouter as Router, Link, NavLink, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import Admin from "./layouts/Admin";
import RTL from "./layouts/RTL";
import Dashboard from "./views/Dashboard/Dashboard";

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={createBrowserHistory()}>
                    <div>
                        <Link to="/"/>
                        <NavLink activeClassName="active" to="/terminal"/>
                    </div>
                    <Route exact path="/" component={IndexPanel}>
                    </Route>
                    <Route exact path="/StudentTerminal" component={StudentTerminal}>
                    </Route>
                    <Route exact path="/admin" component={Admin}>
                    </Route>
                    <Route path="/rtl" component={RTL}>
                    </Route>
                    <Route path="/admin" component={Admin}>
                    </Route>
                    <Route path="/dashboard" component={Dashboard}>
                    </Route>
                </Router>
            </div>
        )
    }
}

export default App;