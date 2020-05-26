import React, { Component } from "react"
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import Grid from "../components/Grid"
import Form from "../components/Form"
import IconButton from "../components/IconButton"
import Field from "../components/Field"
import Popup from "../components/Popup"
import apiClient from "../services/apiClient"
import Loading from "../components/Loading"
import Error from "../components/Error"
import dogApi from "../services/dogApi"

export default class GridView extends Component {
  
  state = {
    users: [],
    isLoading: true,
    errorStatus: "",
    showPopup: false,
    breedOptions: [],
    breed: "no-filter",
    gender: "no-filter",
    age:"no-filter"
  };

  componentDidMount() {
    apiClient
      .getUsers()
      .then((users) => {
        dogApi
        .listAll()
        .then(({data: response}) => {
          this.setState({
            isLoading: false,
            breedOptions: this.displayDogOptions(response.message),
            users: users.data
          });
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            //errorStatus: error.response.status,
          });
        });
      })
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          errorStatus: error.response.status
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

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleChange = (e) => {
    this.setState(
      {[e.target.name]: e.target.value}
    );
  };

  handleFilterSubmit = () => {
    // const { breed, gender, age, users } = this.state;
    // let filters = [];
    // breed !=="no-filter" && filters.push("breed");
    // gender !=="no-filter" && filters.push("gender");
    // age !=="no-filter" && filters.push("age");


    // const filtered = users.filter((user) => {
    //   filters.include("breed")
    //   return breed === user.breed && gender === user.gender && age === user.age 
    // })

    // this.setState(
    //   { users:filtered }
    // );
    return;
    
  }
  
  render() {
    const {users, isLoading, errorStatus, breed, breedOptions, gender, age} = this.state;
    return (
      <div className="App__container">
        {isLoading && <Loading/>}
        {!isLoading && errorStatus && <Error status={errorStatus}/>}
        {!isLoading && !errorStatus &&
        <>
        <Navbar>
          <IconButton
              to={`/${this.props.currentUser._id}`}
              iconClass="fas fa-user-circle"
            />
          <IconButton
              iconClass="fas fa-sliders-h"
              onClick={this.togglePopup}
            />
        </Navbar>
        <Section hasNav>
          <Grid users={users} currentUserId={this.props.currentUser._id}/>
        </Section>
        <Navbar isFooter>
          <IconButton
            to="/"
            iconClass="fas fa-border-all"
          />
          <IconButton
            to="/"
            iconClass="fas fa-comment-alt"
          />
          <IconButton
            to="/favs"
            iconClass="fas fa-star"
          />
          <IconButton
            to="/events"
            iconClass="fas fa-calendar"
          />
        </Navbar>
        {this.state.showPopup &&
          <>
          <Popup closePopup={this.togglePopup}>
            <Form
              onSubmit={this.handleFilter}
              submitButtonText="filter"
              >
              <Field 
              label="breed"
              type="select"
              name="breed"
              value={breed}
              options={[{value: "no-filter", text:"no filter"}, ...breedOptions]}
              onChange={this.handleChange}
              />
              <Field
              required
              label="gender"
              type="select"
              name="gender"
              value={gender}
              options={[{value: "no-filter", text:"no filter"},{value: "male", text:"male"},{value: "female", text:"female"},{value: "non-binary", text:"non binary"}]}
              onChange={this.handleChange}
              />
               <Field
              required
              label="age"
              type="select"
              name="age"
              value={age}
              options={[{value: "no-filter", text:"no filter"}, {value: "1-5", text:"1-5"},{value: "6-10", text:"6-10"},{value: "11-15", text:"11-15"}]}
              onChange={this.handleChange}
              />
            </Form>
          </Popup>
          </>
        }
        </>
        }
      </div>
    );
  }
}


