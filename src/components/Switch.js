import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home"
import Calendar from "./Calendar"
import { useSelector } from 'react-redux'
import UsersGrid from './Grid'
import SessionsGrid from "./SessionGrid"
import Profile from "./Profile"

function AuthSwitch() {

    const currentUser = useSelector(state => state.auth.currentUser);

    const authRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="/perfil" component={Profile}/>
            <Route exact path="/usuarios" component={UsersGrid}/>
            <Route exact path="/sesiones" component={SessionsGrid}/>
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
