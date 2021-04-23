import React from "react";
import "./App.scss";
import IndexPanel from "./IndexPanel";
import StudentTerminal from "./StudentTerminal.jsx";
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from "react-router-dom";
import FacultyHome from "./component/FacultyHome";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/"/>
                    <NavLink activeClassName="active" to="/terminal"/>
                </div>

                <Switch>
                    <Route exact path="/" component={IndexPanel}/>
                    <Route path="/terminal" component={StudentTerminal}/>
                    <Route exact path='/FacultyHome' component={FacultyHome}>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;