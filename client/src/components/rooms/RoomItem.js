import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class RoomItem extends Component {
  render() {
      const { rooms } = this.props
    return (
      <div className="card card-body bg-light mb-2">
      <div className="row">
      <div className="col-lg-6 col-md-4 col-8"></div>
      </div> 
      <Link to={`/profile/${rooms._id}`} className="btn btn-info">{rooms.name}</Link>
      </div>
    )
  }
}
RoomItem.propTypes = {
    rooms: PropTypes.object.isRequired
}
export default RoomItem;