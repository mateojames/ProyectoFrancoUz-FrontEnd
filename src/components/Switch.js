import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Home from "./Home"
import Calendar from "./Calendar"
import Calendarr from "./Calendar1"
import Calendarrr from "./Calendar2"
import UpdateProfile from "./UpdateProfile"
import { useSelector } from 'react-redux'
import UsersGrid from './Grid'
import SessionsGrid from "./SessionGrid"

function AuthSwitch() {

    const currentUser = useSelector(state => state.auth.currentUser);

    const authRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="/Calendar1" component={Calendarr} />
            <Route exact path="/Calendar2" component={Calendarrr} />
            <Route path="/inicio" component={Dashboard}/>
            <Route path="/update-profile" component={UpdateProfile}/>
            <Route path="/usuarios" component={UsersGrid}/>
            <Route path="/sesiones" component={SessionsGrid}/>
            <Route path="/" component={Home} />
        </Switch>
    );

    const externalRoutes = (
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    );


     return (currentUser ? authRoutes : externalRoutes)
}

export default AuthSwitch;
