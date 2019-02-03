import React, { Component } from 'react'
import { connect } from "react-redux";
import propTypes from "prop-types";
import { showRoom } from "../../actions/roomActions";
import RoomItem from "./RoomItem"

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
      
      // console.log(JSON.stringify(rooms))
      //const updateRooms = rooms.map((d) => <li {d.name}>{d.name}</li>);
      //console.log(updateRooms)
    return (
        
<div className="dashboard">
          <div className="container">
            <div className="row">
            <div className="col-md-12 text-center">
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
