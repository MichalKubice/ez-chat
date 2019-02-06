import React, { Component } from 'react';
import { connect } from "react-redux";
import propTypes from "prop-types";
import {getMessages} from "../../../actions/roomActions";
import UserList from "./UserList";
import MessageList from "./MessageList"
import {Link} from "react-router-dom"
import TextFieldGroup from "../../common/TextFieldGroup";
import { sendMessage } from "../../../actions/roomActions";
class Room extends Component {
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
    }
  render() {
      const {messages} = this.props.rooms;
      let content;
          content = <div className="row">
          
          <div className="col-md-6"> 
          <Link to="/get-rooms" className="btn btn-light mb-3 float-left">Back</Link>
          <Link to="/get-rooms" className="btn btn-light ml-3 float-left">Leave</Link>
          <p class="col bg-warning ml-3 float-left">ID : {this.props.match.params.id}</p>
          </div>
          </div>
      
    return (
      <div className="room">
      <div className="container">
      <div className="row">
      <div className="col-md-12">
      {content}
      <MessageList messages={messages} />
      <form onSubmit={this.onSubmit}>
      <TextFieldGroup 
            placeholder="Message"
            name="body"
            value={this.state.body}
            onChange={this.onChange}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" /></form>
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
    sendMessage: propTypes.func.isRequired
}
const mapStateToProps = state => ({
    rooms: state.rooms,
    auth: state.auth
})
export default connect(mapStateToProps,{sendMessage,getMessages})(Room);