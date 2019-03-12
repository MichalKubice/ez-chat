import React, { Component } from 'react'
import { connect } from "react-redux";
import propTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { createRooms } from "../../actions/roomActions";
import { Link } from "react-router-dom";

class createRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "",
            password: "",
            errors: {}   
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
      if (nextProps.errors) {
        this.setState({errors: nextProps.errors})
      }
    }
  onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e) {
      e.preventDefault();
      const room = {
          roomName: this.state.roomName,
          password: this.state.password
      };
      this.props.createRooms(room,this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
<div className="dashboard">
          <div className="container">
            <div className="row">
            <div className="col-md-5 m-auto">
            <Link to="/dashboard" className="btn btn-light mb-3 float-left">Back</Link>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup 
            placeholder="room name"
            name="roomName"
            value={this.state.roomName}
            onChange={this.onChange}
            error={errors.roomName}
            />
            <TextFieldGroup 
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
                <hr />
              </div>
            </div>
          </div>
      </div>
    )
  }
}
createRoom.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  createRooms: propTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
  
});

export default connect(mapStateToProps,{ createRooms})(createRoom);
