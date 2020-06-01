import React, { Component } from "react"
import { Link } from "react-router-dom"
import Form from "../components/Form"
import Field from "../components/Field"
import dogApi from "../services/dogApi"

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    imgUrl: "",
    breed: "",
    gender: "",
    about: "",
    birth: "",
    lng: "",
    lat: "",
    breedOptions:[],
    loading:true,
    usernameValid: false,
    passwordValid: false,
    aboutValid: false,
    birthValid: false,
    formValid: false,
    breedValid: false,
    genderValid: false,
    formErrors: {username: "", password: "", about: "", birth: ""}
  };

  componentDidMount() {
    dogApi
      .listAll()
      .then(({data: response}) => {
        if (window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
              lng: position.coords.longitude,
              lat: position.coords.latitude
            });
          })
        }
        this.setState({
          isLoading: false,
          breedOptions: this.displayDogOptions(response.message)
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        });
      });
  }

  displayDogOptions = (response) =>{
    const dogArray = Object.keys(response);
    const dogOptions = dogArray.map((dogOption) => {
      return {value: dogOption, text:dogOption}
    })
    return dogOptions;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, imgUrl, breed, gender, about, birth, lng, lat } = this.state;
    this.props.onSignup({ username, password, imgUrl, breed, gender, about, birth, lng, lat });
  };

  handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    this.setState(
      {[e.target.name]: e.target.value},
      () => { this.validateField(fieldName, value) }
    );
    if (e.target.name === "breed") {
      dogApi
      .getRandomImage(e.target.value)
      .then(({data: response}) => {
        this.setState({
            imgUrl: response.message
        });
      })
      .catch();
    }
  };

  validateField = (fieldName, value) => {
    let {formErrors, usernameValid, passwordValid, birthValid, aboutValid, genderValid, breedValid } = this.state
    
  
    switch(fieldName) {
      case 'username':
        usernameValid = value.match(/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i); 
        formErrors.username = usernameValid ? '' : 'username is not 6 to 20 characters or has spaces or strange characters';
        break;
      case 'password':
        passwordValid = value.length > 6;
        formErrors.password = passwordValid ? '': 'password is lower than 6 characters';
        break;
      case 'birth':
        birthValid = new Date(value).getTime() < new Date().getTime()
        formErrors.birth = birthValid ? '': 'birth date must be a day in the past';
        break;
      case 'about':
        aboutValid = value.length > 6 && value.length < 120;
        formErrors.about = aboutValid ? '': 'about field is lower than 6 or higher than 120 characters';
        break;
      case 'breed':
        breedValid = value.length > 0;
        formErrors.breed = breedValid ? '': 'breed must be selected';
        break;
      case 'gender':
        genderValid = value.length > 0;
        formErrors.gender = genderValid ? '': 'gender must be selected';
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      usernameValid,
      passwordValid,
      birthValid,
      aboutValid,
      genderValid,
      breedValid
    }, this.validateForm);
  }

  validateForm = () => {
    let { usernameValid, passwordValid, birthValid, aboutValid, breedValid, genderValid } = this.state
    this.setState({formValid: usernameValid && passwordValid && birthValid && aboutValid && breedValid && genderValid});
  }

  render() {
    const { username, password, breed, gender, about, birth, formErrors } = this.state;

    return (
      <>
        <h1 className="pt-1"><span className="bg-pink fs-big">Signup</span></h1>
        <Form 
          onSubmit={this.handleSubmit}
          submitButtonText="signup"
          disabled={!this.state.formValid}>
          <Field
            required
            validationError={formErrors.username}
            label="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            />
          <Field
            required
            validationError={formErrors.password}
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            />
          <Field
            required
            validationError={formErrors.about}
            label="about"
            type="text"
            name="about"
            value={about}
            onChange={this.handleChange}
            />
          <Field
            required
            validationError={formErrors.birth}            
            label="birth"
            type="date"
            name="birth"
            value={birth}
            onChange={this.handleChange}
            />
          <Field 
            required
            label="breed"
            type="select"
            name="breed"
            value={breed}
            options={[{value: "", text:"choose breed"}, ...this.state.breedOptions]}
            onChange={this.handleChange}
            />
          <Field
            required
            label="gender"
            type="select"
            name="gender"
            value={gender}
            options={[{value: "", text:"choose gender"}, {value: "male", text:"male"},{value: "female", text:"female"},{value: "non-binary", text:"non binary"}]}
            onChange={this.handleChange}
            />
        </Form>
        <div className="col-12 pb-1 ta-center fs-small">
          <p>Do you have an account? <Link to="/login">Login</Link></p>
        </div>
      </>
    );
  }
}
