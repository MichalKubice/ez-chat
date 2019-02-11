import React, { Component } from 'react';
import PropTypes from "prop-types";

class Message extends Component {
  render() {
      const { messages } = this.props
    return (
        <div className="card card-body mb-2 ">
        <div className="row">
          <div className="col-md-2">
          <h5 className="card-title">{messages.author}</h5>
          <img className="rounded-circle" src={messages.img} alt="" />
          </div>
          <div className="col-md-8">
            <p className="lead">{messages.body}</p> 
          </div>
    
        </div>
      </div>
    )
  }
}
Message.propTypes = {
    messages: PropTypes.object.isRequired
}
export default Message;