import React, { Component } from "react";
import Section from "../components/Section"
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import Form from "../components/Form"
import IconButton from "../components/IconButton"
import Field from "../components/Field"

export default class ProfileView extends Component {
  

  state = {
    user: null,
    isLoading: true,
    editing: false,
    username:"",
    about:"",
    birth:"",
    breed:"",
    gender:"",
  };

  componentDidMount() {
    apiClient
      .getUser(this.props.match.params.id)
      .then((user) => {
        this.setState({
          isLoading: false,
          user: user.data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          user: null,
        });
      });
  }

  changeScreen = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    return; 
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { user, isLoading, editing } = this.state;
    return (
      <div className="App__container">
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
        <Section>
          {!editing ?
          <>
            <div className="profile__pic-container">
            <IconButton
              buttonClass="z-index-1000 pa-tl"
              iconClass="fas fa-chevron-left"
              to="/"
            />
            {this.props.match.params.id === this.props.currentUser._id &&
              <IconButton
              buttonClass="z-index-1000 pa-tr"
              iconClass="fas fa-edit"
              onClick= {this.changeScreen}
            />
            }
            <img src={user.imgUrl} className="profile__pic-container__pic" alt={user.username}/>
            </div>

            <div>
              <div className="flex-row jc-between">
                <div className="flex-row col-8 pa-1">
                  <h2 className="ellipsis col-12 pb-small">{user.username}</h2>
                  <i className="pr-small fs-small fas fa-map-marker-alt fc-pink"></i>
                  <span className="fs-small pr-small">2km away</span>
                  <i className="pr-small fs-small fas fa-circle fc-pink "></i>
                  <span className="fs-small">connected</span>
                </div>
                <ul className="flex-row jc-between col-4 pa-1">
                  <li className="col-6 ta-center as-center">
                    <i id="icon-star" className="fas fa-star fc-pink" ></i>
                  </li>
                  <li className="col-6 ta-center as-center">
                    <Link className="link--disabled" to="">
                      <i className="fas fa-comment-alt" ></i>
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="pr-1 pl-1 pb-1">{user.about}</p>
              <ul className="pr-1 pl-1 flex-row">
                <li className="flex-row col-12 bb-white pb-1">
                    <span className="flex-row col-4">Breed:</span>
                    <span className="flex-row col-8">{user.breed}</span>
                </li>
                <li className="flex-row col-12 bb-white pb-1 pt-1">
                    <span className="flex-row col-4">Birth:</span>
                    <span className="flex-row col-8">{user.birth}</span>
                </li>
                <li className="flex-row col-12 pt-1">
                    <span className="flex-row col-4">Gender:</span>
                    <span className="flex-row col-8">{user.gender}</span>
                </li>
              </ul>
            </div>
          </>
          :
          <>
          <div className="profile__pic-container">
            <IconButton
            buttonClass="z-index-1000 pa-tl"
            iconClass="fas fa-chevron-left"
            onClick= {this.changeScreen}/>
            <img src={user.imgUrl} className="profile__pic-container__pic" alt={user.username}/>
            </div>
            <Form 
              onSubmit={this.handleSubmit}>
              <Field
                label="name"
                type="text"
                name="username"
                value={user.username}
                onChange={this.handleChange}
                />
              <Field
                label="about"
                type="text"
                name="about"
                value={user.about}
                onChange={this.handleChange}
                />
              <Field             
                label="birth"
                type="date"
                name="birth"
                value={user.birth}
                onChange={this.handleChange}
                />
              <Field 
                label="breed"
                type="text"
                name="breed"
                value={user.breed}
                onChange={this.handleChange}
                />
              <Field
                label="gender"
                type="select"
                name="gender"
                value={user.gender}
                options={[{value: "male", text:"male"},{value: "female", text:"female"},{value: "non-binary", text:"non binary"}]}
                onChange={this.handleChange}
                />
            </Form>
          </>
          }
        </Section>
        )}
      </div>
    );
  }
}


