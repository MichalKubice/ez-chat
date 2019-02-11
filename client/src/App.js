import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Profile from "./components/layout/Profile";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import PrivateRoute from "./components/common/PrivateRoute";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from "./components/dashboard/Dashboard";
import createRoom from "./components/rooms/createRoom";
import getRooms from './components/rooms/getRooms';
import joinRoom from './components/rooms/joinRoom';
import Room from "./components/rooms/Room";

//if(localStorage.jwtToken) {
// setAuthToken(localStorage);
 //const decoded = jwt_decode(localStorage.jwtToken);
 //store.dispatch(setCurrentUser(decoded));
 // TRY this.props.isAuthenticated(true);
//}

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
      <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      <PrivateRoute exact path="/create-room" component={createRoom}/>
      <PrivateRoute exact path="/get-rooms" component={getRooms}/>
      <PrivateRoute exact path="/join-room" component={joinRoom}/>
      <PrivateRoute exact path="/profile/:id" component={Room}/>
      <PrivateRoute exact path="/profile" component={Profile}/>
      </Switch>
      </div>
      <Footer />
      </div>
      </Router>
       </Provider>
    );
  }
}

export default App  ;
