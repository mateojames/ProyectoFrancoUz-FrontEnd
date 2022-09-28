import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Home from "./Home"

import Calendar from "./Calendar"

import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import withRoot from "../withRoot"



function App() {
  return (
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/Calendar" component={Calendar} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/" component={Home} />
            </Switch>
          </AuthProvider>
        </Router>
  )
}

export default withRoot(App);
