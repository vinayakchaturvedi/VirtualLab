import React from "react";
import "./App.scss";
import IndexPanel from "./IndexPanel";
import StudentTerminal from "./StudentTerminal.jsx";
import {BrowserRouter as Router,Route,Link,NavLink,Switch} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
         <Router>
             <div>
                 <Link to="/" />
                 <NavLink activeClassName="active" to="/terminal"/>
             </div>

             <Switch>
                <Route exact path="/" component={IndexPanel}/>
                <Route path="/terminal" component={StudentTerminal}/>
             </Switch>
         </Router>
        );
    }
}
export default App;