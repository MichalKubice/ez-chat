import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions"
import { Link } from "react-router-dom";
import { showRoom } from "../../actions/roomActions";


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.showRoom();
  }
  render() {
    const { user } = this.props.auth;
    const { loading } = this.props.profile
    let dashboardContent;
    if(loading) {
      dashboardContent = "loading"
    } else {
      dashboardContent = <div><h1>Welcome {user.name}!</h1>
      <div className="m-5">
      <p><Link to="/get-rooms" className="btn btn-lg btn-info btn-block">My rooms</Link></p>
      <p><Link to="/create-room" className="btn btn-lg btn-info btn-block">Create new room</Link></p>
      <p><Link to="/join-room" className="btn btn-lg btn-info btn-block ">Join room</Link></p>
      </div>
      </div>
    }
    return (
      <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="lead"> {dashboardContent} </div>
                <hr />
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
  profile: PropTypes.object.isRequired,
  showRoom: PropTypes.func.isRequired
} 

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})


export default connect(mapStateToProps, { getCurrentProfile, showRoom})(Dashboard);