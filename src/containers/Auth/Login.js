import React, { Component } from "react";

import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { convertToObject } from "typescript";

class Login extends Component {
  constructor(props) {
    super(props);
    // this.btnLogin = React.createRef();
    this.state = {
      username: "hoidanit",
      password: "123456",
      showPass: false,
    };
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleLogin() {
    console.log(this.state);
  }

  handleOnClickShowPass() {
    this.setState({
      showPass: !this.state.showPass,
    });
  }
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter your Username"
                value={this.state.username}
                onChange={(event) => this.handleUsername(event)}
              />
            </div>
            {/* PASSWORD */}
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.showPass ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={this.state.password}
                  onChange={(event) => this.handlePassword(event)}
                />
                <i
                  className={
                    this.state.showPass ? "fas fa-eye" : "fas fa-eye-slash"
                  }
                  onClick={() => this.handleOnClickShowPass()}
                ></i>
              </div>
            </div>
            <div className="col-12 form-group ">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>

            <div className="col-12 text-center">
              <span>Login other method</span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-google"></i>
              <i className="fab fa-facebook-f"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
