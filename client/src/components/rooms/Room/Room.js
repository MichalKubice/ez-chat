import React, { Component } from 'react';
import { connect } from "react-redux";
import propTypes from "prop-types";
import {getMessages} from "../../../actions/roomActions";
import UserList from "./UserList";
import MessageList from "./MessageList"

class Room extends Component {
    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.getMessages(this.props.match.params.id)
        }
    }
  render() {
    return (
      <div>
        <h1>messages</h1>
      </div>
    )
  }
}
Room.propTypes = {
    rooms: propTypes.object.isRequired,
    getMessages: propTypes.func.isRequired
}
const mapStateToProps = state => ({
    rooms: state.rooms
})
export default connect(mapStateToProps,{getMessages})(Room);