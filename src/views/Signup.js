import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form"
import Field from "../components/Field"

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    imgUrl: "https://images.dog.ceo/breeds/terrier-russell/jack2.jpg",
    breed: "",
    gender: "",
    about: "",
    birth: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, imgUrl, breed, gender, about, birth } = this.state;
    const { onSignup } = this.props;
    if (username !== "" && password !== "") {
      onSignup({ username, password, imgUrl, breed, gender, about, birth });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password, imgUrl, breed, gender, about, birth } = this.state;

    return (
      <>
        <h1 className="pt-1"><span className="bg-pink fs-big">Signup</span></h1>
        <Form 
          onSubmit={this.handleSubmit}
          submitButtonText="signup">
          <Field
            label="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            />
          <Field
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            />
          <Field
            label="about"
            type="text"
            name="about"
            value={about}
            onChange={this.handleChange}
            />
          <Field             
            label="birth"
            type="date"
            name="birth"
            value={birth}
            onChange={this.handleChange}
            />
          <Field 
            label="breed"
            type="text"
            name="breed"
            value={breed}
            onChange={this.handleChange}
            />
          <Field
            label="gender"
            type="select"
            name="gender"
            value={gender}
            options={[{value: "male", text:"male"},{value: "female", text:"female"},{value: "non-binary", text:"non binary"}]}
            onChange={this.handleChange}
            />
          <Field
            type="hidden"
            name="imgUrl"
            value={imgUrl}
            />
        </Form>
        <div className="col-12 pb-1 ta-center fs-small">
          <p>Do you have an account? <Link to="/login">Login</Link></p>
        </div>
      </>
    );
  }
}
