import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Utils/SetAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
//Check for token

if (localStorage.jwt_token) {
  //Set Auth TOken header
  setAuthToken(localStorage.jwt_token);

  //dcode tokem and get usr info and expiration

  const decoded = jwt_decode(localStorage.jwt_token);

  //Set USer and IsAuthenticated

  store.dispatch(setCurrentUser(decoded));

  //Check For Expired Token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());

    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect Login
    window.location.href = "/login";
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
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
