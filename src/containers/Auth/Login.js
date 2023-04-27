import React, { Component } from "react";

import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";

import userService from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    // this.btnLogin = React.createRef();
    this.state = {
      username: "hoanglx@gmail.com",
      password: "123456",
      showPass: false,
      errMessage: "",
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

  handleLogin = async () => {
    console.log("handleLogin ", this.state);
    this.setState({
      errMessage: "",
    });
    try {
      let data = await userService.handleLoginApi(
        this.state.username,
        this.state.password
      );
      // console.log("Handle Login Data return >>  ", data);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.userInfo);
        this.setState({
          errMessage: "login success",
        });
      }
    } catch (e) {
      console.log(">>>> Axios error", e.response);
      this.setState({
        errMessage: e.response.data.message,
      });
    }
  };

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
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
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

    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
