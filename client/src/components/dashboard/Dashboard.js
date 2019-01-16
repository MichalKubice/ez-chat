import React, { Component } from 'react';
 import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions"
import { setCurrentUser } from "../../actions/authActions"


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile

    let dashboardContent;
    if(profile === null || loading) {
      dashboardContent = "loading"
    } else {
      dashboardContent = "Welcome!"
    }
    return (
      <div className="dashboard">
        <div className="containter">
        <div className="row">
        <div className="col-md-4"> 
        <h1 className="display-3"> { dashboardContent} </h1>
        </div>
        
        </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
} 

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})


export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);