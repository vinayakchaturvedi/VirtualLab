import React from "react";
import "./App.scss";
import IndexPanel from "./IndexPanel";
import StudentTerminal from "./StudentTerminal.jsx";
import {BrowserRouter as Router, Link, NavLink, Route} from "react-router-dom";
import FacultyHome from "./components/FacultyHome";
import StudentHome from "./components/StudentHome";

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Link to="/"/>
                        <NavLink activeClassName="active" to="/terminal"/>
                    </div>
                    <Route exact path="/" component={IndexPanel}>
                    </Route>
                    <Route exact path="/terminal" component={StudentTerminal}>
                    </Route>
                    <Route exact path='/FacultyHome' component={FacultyHome}>
                    </Route>
                    <Route exact path='/StudentHome' component={StudentHome}>
                    </Route>
                </Router>
            </div>
        )
    }
}

export default App;