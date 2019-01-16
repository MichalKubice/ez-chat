import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser} from "./actions/authActions";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from "./components/dashboard/Dashboard";


if(localStorage.jwtToken) {
 setAuthToken(localStorage);
 const decoded = jwt_decode(localStorage.jwtToken);
 store.dispatch(setCurrentUser(decoded));
 // TRY this.props.isAuthenticated(true);
}

class App extends Component {
  render() {
    return (
      <Provider store ={ store }>
      <Router>
      <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing}/>
      <div className="container">
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      </div>
      <Footer />
      </div>
      </Router>
       </Provider>
    );
  }
}

export default App  ;
