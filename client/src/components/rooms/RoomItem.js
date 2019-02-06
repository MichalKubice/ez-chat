import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class RoomItem extends Component {
  render() {
      const { rooms } = this.props
      const participants = rooms.participants
      const arr = participants.length
      let act;
      if (arr == 1) {
        act = "User"
      } else {act = "Users"

      };
      console.log(arr)
    return (
      <div className="card mb-3">
      <div className="row">
      <div className="col-lg-6 col-md-4 col-8"></div>
      </div> 
      <Link to={`/profile/${rooms._id}`} className="btn btn-info">{rooms.name}</Link>
      <div className="col bg-success">{arr} {act} </div>
      </div>
    )
  }
}
RoomItem.propTypes = {
    rooms: PropTypes.object.isRequired
}
export default RoomItem;