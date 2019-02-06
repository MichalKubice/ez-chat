import React, { Component } from 'react'
import Message from "./Message";
import propTypes from "prop-types";

class MessageList extends Component {
  render() {
    const { messages } = this.props;
    let msg;
    if(messages.length > 0) {
      msg = messages.map(message => (
        <Message key={message.createdAt} messages={message}/> 
      ))

    } else {
      msg = "No messages."
    }
    return (
<div className="dashboard">
          <div className="container">
            <div className="row">
            <div className="col-md-12 text-center">

            {msg}
              </div>
            </div>
          </div>
      </div>
    )
  }
}


export default MessageList;