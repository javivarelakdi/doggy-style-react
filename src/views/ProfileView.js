import React, { Component } from "react";
import Section from "../components/Section"
import { Link } from "react-router-dom"
import apiClient from "../services/apiClient"
import Form from "../components/Form"
import IconButton from "../components/IconButton"
import Field from "../components/Field"
import Loading from "../components/Loading"
import Error from "../components/Error"


export default class ProfileView extends Component {
  

  state = {
    user: null,
    isLoading: true,
    editing: false,
    isFav: false,
    errorStatus: ""
  };

  componentDidMount() {
    apiClient
      .getUser(this.props.match.params.id)
      .then((user) => {
        let userFans = [];
        userFans = user.data.fans.filter((fan) => {
          return fan._id === this.props.currentUser._id
        }) 
        this.setState({
          isLoading: false,
          user: user.data,
          isFav: userFans.length > 0 ? true : false,
        });
      })
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          errorStatus: error.response.status
        });
      });
  }

  changeScreen = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
    const {about, birth, breed, gender, imgUrl} = this.state.user;
    apiClient
      .editUser(this.props.match.params.id, {
        imgUrl,
        about,
        birth,
        breed,
        gender
      })
      .then((event) => {    
        this.setState({
          event: event.data,
          editing: false
        });
      })
      .catch(({...error}) => {
        this.setState({
          errorStatus: error.response.status
        });
      }); 
  };

  handleLogoutSubmit = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleToggleFav = () => {
    apiClient
      .postUserFav(this.props.match.params.id, {isFav: !this.state.isFav})
      .then((user) => {    
        let userFans = [];
        userFans = user.data.fans.filter((fan) => {
          return fan._id === this.props.currentUser._id
        }) 
        this.setState({
          user: user.data,
          isFav: userFans.length > 0 ? true : false
        });
      })
      .catch(); 
  }

  render() {
    const { user, isLoading, editing, errorStatus } = this.state;
    return (
      <div className="App__container">
        {isLoading && <Loading/>}
        {!isLoading && errorStatus && <Error status={errorStatus}/>}
        {!isLoading && !errorStatus &&
        <Section>
          {!editing ?
          <>
            <div className="profile__pic-container">
            <IconButton
              buttonClass="z-index-1000 pa-tl"
              iconClass="fas fa-chevron-left"
              to="/"
            />
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
                <ul className={
                  `flex-row col-4 pa-1 ${this.props.match.params.id === this.props.currentUser._id 
                    ? "jc-end" 
                    : "jc-between"}`
                }>
                {this.props.match.params.id === this.props.currentUser._id ?
                <li className="col-6 ta-center as-center">
                <IconButton
                  iconClass="fas fa-edit"
                  onClick= {this.changeScreen}
                />
                </li>
                :
                <>
                <li className="col-6 ta-center as-center">
                  <IconButton
                    iconClass={`${this.state.isFav ? "fas" : "far"}  fa-star`}
                    onClick= {this.handleToggleFav}
                  />
                </li>
                <li className="col-6 ta-center as-center">
                  <Link className="link--disabled" to="">
                    <i className="fas fa-comment-alt" ></i>
                  </Link>
                </li>
                </>
                }
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
              onSubmit={this.handleEditSubmit}>
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
            <Form 
              onSubmit={this.handleLogoutSubmit} 
              submitButtonText="logout">
            </Form>
          </>
          }
        </Section>
        }
      </div>
    );
  }
}


