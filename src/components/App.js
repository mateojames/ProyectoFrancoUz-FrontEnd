import React from "react"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Home from "./Home"
import Calendar from "./Calendar"
import PrivateRoute from "./PrivateRoute"
import UpdateProfile from "./UpdateProfile"
import withRoot from "../withRoot"
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import modalReducer from '../store/reducers/modal';
import calendarReducer from '../store/reducers/calendar';
import ResponsiveAppBar from "./ResponsiveAppBar"

const rootReducer = combineReducers({
  modal: modalReducer,
  calendar: calendarReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
        <Router>
          <Provider store={store}>
            <AuthProvider>
              <ResponsiveAppBar/>
              <Switch>
                <PrivateRoute exact path="/Calendar" component={Calendar} />
                <PrivateRoute path="/inicio" component={Dashboard}/>
                <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                <Route path="/" component={Home} />
              </Switch>
            </AuthProvider>
          </Provider>
        </Router>
  )
}

export default withRoot(App);
