import React, { Component } from 'react';
import PropTypes from "prop-types";

class User extends Component {
  render() {
      const { userList } = this.props
    return (
        <div className="card card-body mb-2 ">
        <div className="row">
          <div className="col-md-12">
          <h5 className="card-title">{userList.name}</h5>
          </div>
          <div className="col-md-8"> 
          </div>
    
        </div>
      </div>
    )
  }
}
User.propTypes = {
    userList: PropTypes.object.isRequired
}
export default User;