import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home"
import Calendar from "./Calendar"
import { useSelector } from 'react-redux'
import UsersGrid from './Grid'
import SessionsGrid from "./SessionGrid"
import Profile from "./Profile"
import {auth} from '../firebase'



function AuthSwitch(props) {

    const currentUser = useSelector(state => state.auth.currentUser);
    
    const authAdminRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="/perfil" component={Profile}/>
            <Route exact path="/usuarios" component={UsersGrid}/>
            <Route exact path="/sesiones" component={SessionsGrid}/>
            <Route path="/" component={Home} />
        </Switch>
    );

    const authPatientRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="/perfil" component={Profile}/>
            <Route path="/" component={Home} />
        </Switch>
    );

    const authProfessionalRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="/perfil" component={Profile}/>
            <Route exact path="/sesiones" component={SessionsGrid}/>
            <Route path="/" component={Home} />
        </Switch>
    );

    const authUndefinedRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={Calendar} />
            <Route path="/" component={Home} />
        </Switch>
    );

    const externalRoutes = (
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    );
    
    var routes = externalRoutes;
    if(currentUser){
        if(props.role){
            switch (props.role) {
                case 'paciente':
                    routes = authPatientRoutes
                    break;
                case 'profesional':
                    routes = authProfessionalRoutes
                    break;
                case 'admin':
                    routes = authAdminRoutes
                    break;
                default:
                    routes = authUndefinedRoutes
              }
        }
    }

    console.log('rolSwitch ', props.role)


     return (routes)
}

export default AuthSwitch;
