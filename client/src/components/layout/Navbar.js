import React, { Component } from 'react'
import {Link} from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();  
  }
  

  render() {
    const { isAuthenticated} = this.props.auth;
    const { user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
      <Link to="/profile" className="nav-link">{user.name}</Link>
          </li>
          <li className="nav-item">
            <a href="/login" onClick={this.onLogoutClick.bind(this)} className="nav-link">
            Logout 
        
            </a>
          </li>
        </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
    );




    return (
<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">Ez.Chat</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          </li>
        </ul>
        { isAuthenticated ? authLinks : guestLinks }
      </div>
    </div>
  </nav>

    )
  }
}
Navbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired

}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Navbar);