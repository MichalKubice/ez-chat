import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser}  from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
          this.setState({errors: nextProps.errors})
        }
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(user,this.props.history);
    }
  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    return (
        <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h1 className="display-5 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account</p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
            placeholder="Username"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            />
              <TextFieldGroup 
            placeholder="Email adress"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            />
            <TextFieldGroup 
            placeholder="Enter password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            />
            <TextFieldGroup 
            placeholder="Enter password again"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
            />
                <input type="submit" className="btn btn-info btn-block mt-2" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
  
};

const mapState = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapState, { registerUser })(withRouter(Register));