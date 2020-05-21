import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;
    if (username !== "" && password !== "") {
      onLogin({ username, password });
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <>
        <div className="profile__pic-container">
          <img src="/images/logo.png" alt="doggy style" className="profile__pic-container__pic"/>
        </div>
        <h2 className="pb-1 ta-center col-12">Welcome!</h2>
        <form 
          onSubmit={this.handleSubmit}
          className="pb-1 ta-center col-12 flex-row ta-center jc-center">
          <div className="pb-1 ta-center col-12">
            <i className="fas fa-user fa-sm mr-1"></i>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className=" pb-1 ta-center col-12">
            <i className="fas fa-lock fa-sm mr-1" aria-hidden="true"></i>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div className=" pb-1 pt-1 ta-center col-6">
            <button className="button" type="submit">Sign in</button>
          </div>
        </form>
        <div className="col-12 pb-1 ta-center fs-small">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p>Forgot your password? <Link to="/" className="disabled">Reset password</Link></p>
        </div>
      </>
    );
  }
}
