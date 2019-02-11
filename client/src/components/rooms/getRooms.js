import React, { Component } from 'react'
import { connect } from "react-redux";
import propTypes from "prop-types";
import { showRoom } from "../../actions/roomActions";
import RoomItem from "./RoomItem"
import { Link } from "react-router-dom"

class getRooms extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: {}
        }
    }
  render() {
      const { rooms } = this.props.rooms;
      let roomItems;
      if(rooms.length > 0) {
        roomItems = rooms.map(room => (
          <RoomItem key={room._id} rooms={room}/> 
        ))

      } else {
        roomItems = "No rooms."
      }
    return (
        
<div className="dashboard">
          <div className="container">
            <div className="row">
            <div className="col-md-12 text-center">
            
            <Link to="/dashboard" className="btn btn-light mb-3 float-left">Back</Link>
            <h1 className="display-4 text-center">Rooms</h1>
            {roomItems}
              </div>
            </div>
          </div>
      </div>
    )
  }
}
getRooms.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  showRoom: propTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  rooms: state.rooms
  
});

export default connect(mapStateToProps,{ showRoom})(getRooms);
