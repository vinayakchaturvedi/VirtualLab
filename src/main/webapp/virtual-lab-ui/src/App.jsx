import React from "react";
import "./App.scss";
import IndexPanel from "./IndexPanel";
import StudentTerminal from "./StudentTerminal.jsx";
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from "react-router-dom";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import Login from "./components/login/login";
import About from "./About";
import Contact from "./Contact";
import FacultyDashboard from "./components/Dashboard/FacultyDashboard";
import CreateExercise from "./components/Dashboard/CreateExercise";
import SubmitExercise from "./components/Dashboard/SubmitExercise";
import CheckSubmission from "./components/Dashboard/CheckSubmission";
import ErrorPage from "./components/Dashboard/ErrorPage";

class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Link to="/"/>
                        <NavLink activeClassName="active" to="/terminal"/>
                    </div>
                    <Switch>
                        <Route exact path="/" component={IndexPanel}>
                        </Route>
                        <Route exact path="/IndexPanel" component={IndexPanel}>
                        </Route>
                        <Route path="/StudentTerminal" component={StudentTerminal}>
                        </Route>
                        <Route path="/login" component={Login}>
                        </Route>
                        <Route path="/studentDashboard" component={StudentDashboard}>
                        </Route>
                        <Route path="/facultyDashboard" component={FacultyDashboard}>
                        </Route>
                        <Route path="/About" component={About}>
                        </Route>
                        <Route path="/Contact" component={Contact}>
                        </Route>
                        <Route path="/CreateExercise" component={CreateExercise}>
                        </Route>
                        <Route path="/SubmitExercise" component={SubmitExercise}>
                        </Route>
                        <Route path="/CheckSubmission" component={CheckSubmission}>
                        </Route>
                        <Route path="/ErrorPage" component={ErrorPage}>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;