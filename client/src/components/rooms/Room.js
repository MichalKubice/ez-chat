import React, { Component } from 'react';
import { connect } from "react-redux";
import propTypes from "prop-types";
import {getMessages} from "../../actions/roomActions";
import MessageList from "./MessageList"
import {Link} from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup";
import { sendMessage } from "../../actions/roomActions";
import {getUserList} from "../../actions/roomActions";
import {leaveRoom} from "../../actions/roomActions";
import { showRoom } from "../../actions/roomActions";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Room extends Component {
    refreshPage(e) {
        e.preventDefault();
        this.props.getMessages(this.props.match.params.id);  
        this.props.getUserList(this.props.match.params.id);
      }
      leaveRoom() {
          confirmAlert({
              title:"Really want to leave?",
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                      this.props.leaveRoom(this.props.match.params.id);
                      this.props.history.push("/get-rooms");
                      this.props.showRoom();
                    }
                },
                {
                  label: 'No',
                  onClick: () => console.log("nope.")
                }
              ]
          })

      }
    constructor(props) {
        super(props);
        this.state = {
            body: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.getMessages(this.props.match.params.id)
            this.props.getUserList(this.props.match.params.id)
        }
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        const room = {
            body: this.state.body
        }
        this.props.sendMessage(this.props.match.params.id,room);
        this.setState({body: ""});
        setTimeout(
            function() {
                this.props.getMessages(this.props.match.params.id)
            }
            .bind(this),
            1000
        )
        
    }
  render() {
      const {messages} = this.props.rooms;
      const {userList} = this.props.rooms;
      let content;
          content = <div className="row">
          
          <div className="col-md-6"> 
          <Link to="/get-rooms" className="btn btn-light mb-3 float-left">Back</Link>
          <button onClick={this.leaveRoom.bind(this)} className="btn btn-light ml-3 float-left">Leave</button>
          <button onClick={this.refreshPage.bind(this)} className="btn btn-light ml-3 float-left"> Get new messages</button>
          
          <p className="col bg-warning ml-3 float-left">ID : {this.props.match.params.id} </p>
          
          </div> 
          </div>
      
    return (
      <div className="room">
      <div className="container">
      <div className="row">
      
      <div className="col-md-12">
      {content}
      <form onSubmit={this.onSubmit}>
      
      <TextFieldGroup 
            placeholder="Message"
            name="body"
            value={this.state.body}
            onChange={this.onChange}
            />
            <input type="submit" className="btn btn-info btn-block mb-3" /></form>
      <MessageList messages={messages} userList={userList}/>
      
            
      </div>
      </div>
      </div>
      </div>
    )
  }
}
Room.propTypes = {
    rooms: propTypes.object.isRequired,
    getMessages: propTypes.func.isRequired,
    sendMessage: propTypes.func.isRequired,
    getUserList: propTypes.func.isRequired,
    leaveRoom: propTypes.func.isRequired,
    showRoom: propTypes.func.isRequired
}
const mapStateToProps = state => ({
    rooms: state.rooms,
    auth: state.auth
})
export default connect(mapStateToProps,{sendMessage,getMessages,getUserList,leaveRoom,showRoom})(Room);