import React, { Component } from 'react'
import Message from "./Message";
import User from "./User";

class MessageList extends Component {
  render() {
    const { messages } = this.props;
    const { userList} = this.props;
    let usr;
    if(userList.length > 0) {
      usr = userList.map(userList => (
        <User key={userList._id} userList={userList}/> 
      ))

    } else {
      usr = "No messages."
    }
    let msg;
    if(messages.length > 0) {
      msg = messages.map(message => (
        <Message key={message._id} messages={message}/> 
      ))

    } else {
      msg = "No messages."
    }
    return (
<div className="dashboard">
          <div className="container">
            <div className="row">
            <div className="col-md-10 text-center">
            {msg}
              </div>
              <div className="col-md-2">UserList {usr}</div>
            </div>
          </div>
      </div>
    )
  }
}


export default MessageList;