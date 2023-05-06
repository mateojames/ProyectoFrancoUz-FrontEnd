import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home"
import AdminCalendar from "./AdminCalendar"
import { useSelector } from 'react-redux'
import UsersGrid from './Grid'
import PatientCalendar from "./PatientCalendar"
import ProfessionalCalendar from "./ProfessionalCalendar"
import NotAsignedHome from "./NotAsignedHome"
import TherapyGrid from "./TherapyGrid"
import Locations from "./Locations"
import LandingHome from "./LandingHome"



function AuthSwitch(props) {

    const currentUser = useSelector(state => state.auth.currentUser);
    
    const authAdminRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={AdminCalendar} />
            <Route exact path="/salas" component={Locations}/>
            <Route exact path="/terapias" component={TherapyGrid}/>
            <Route exact path="/usuarios" component={UsersGrid}/>
            <Route path="/" component={LandingHome} />
        </Switch>
    );

    const authPatientRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={PatientCalendar} />
            <Route path="/" component={LandingHome} />
        </Switch>
    );

    const authProfessionalRoutes = (
        <Switch>
            <Route exact path="/Calendar" component={ProfessionalCalendar} />
            <Route path="/" component={LandingHome} />
        </Switch>
    );

    const authUndefinedRoutes = (
        <Switch>
            <Route path="/" component={NotAsignedHome} />
        </Switch>
    );

    const externalRoutes = (
        <Switch>
            <Route path="/" component={LandingHome} />
        </Switch>
    );
    
    var routes = externalRoutes;
    if(currentUser){
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

    console.log('rolSwitch ', props.role)


     return (routes)
}

export default AuthSwitch;
