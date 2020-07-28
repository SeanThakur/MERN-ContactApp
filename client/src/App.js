import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {setCurrentUser} from "./redux/actions/auth";
import {setLogout} from "./redux/actions/auth";

import PrivateRoute from "./utils/privateRoute";

import Navbar from "./components/Layouts/Navbar";
import Landing from "./components/Layouts/Landing";
import Signup from "./components/Users/Signup";
import Login from "./components/Users/Login";
import Contact from "./components/Contacts/Contact";
import AllContact from "./components/Contacts/AllContact";
import ViewContacts from "./components/Contacts/ViewContacts";

if(localStorage.jwtToken)
{
  //Checking if token present in localstorage then login persist
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  //logout the user
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime)
  {
    store.dispatch(setLogout());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/contacts" component={AllContact} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Contact} />
                <PrivateRoute exact path="/view-contacts" component={ViewContacts} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
