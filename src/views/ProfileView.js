import React, { Component } from "react";
import Section from "../components/Section"
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
      .then(async (user) => {
        let userFans = [];
        userFans = user.data.fans.filter((fan) => {
          return fan._id === this.props.currentUser._id
        })
        const distance = await this.getDistance(user.data.location.coordinates[0], user.data.location.coordinates[1])
        this.setState({
          isLoading: false,
          user: user.data,
          isFav: userFans.length > 0 ? true : false,
          distance: distance
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

  getDistance = (lng, lat) => {
    return new Promise(resolve => {
      const toRad = (degrees) => {
        return degrees * (Math.PI/180);
      }
      
      const distance = (lon1, lat1, lon2, lat2) => {
          const R = 6371; // Radius of the earth in km
          const dLat = toRad(lat2-lat1);  // Javascript functions in radians
          const  dLon = toRad(lon2-lon1); 
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2); 
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          const d = R * c; // Distance in km
          return d;
        }
        
        window.navigator.geolocation.getCurrentPosition(function(pos) {
          resolve(distance(pos.coords.longitude, pos.coords.latitude, lng, lat))
        });
    })
  }

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

  handleJoinRoom = () => {
    apiClient
      .getChats()
      .then((chats) => {
        const targetUserId = this.props.match.params.id;
        const currentUserId = this.props.currentUser._id
        //checks if chat exists
        const targetChat = chats.data.filter((chat)=>{
          const hasTargetUser = chat.users.some((user) => {
            return user._id === targetUserId
          })
          const hasCurrentUser = chat.users.some((user) => {
            return user._id === currentUserId
          })
          return (hasTargetUser && hasCurrentUser)
        })
        //if chat exists redirects to chat
        //if it doesnt creates chat and redirects to it
        targetChat.length
          ? this.props.history.push(`/chat/${targetChat[0]._id}`, { from: this.props.location })
          : apiClient
            .createChat({targetUserId:targetUserId})
            .then((chat) => {
              this.props.history.push(`/chat/${chat.data._id}`, { from: this.props.location })
            })
      })
  }

  render() {
    const { user, isLoading, editing, errorStatus, distance } = this.state;
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

            <div className="pb-1">
              <div className="flex-row jc-between">
                <div className="flex-row col-8 pa-1">
                  <h2 className="ellipsis col-12 pb-small">{user.username}</h2>
                  <i className="pr-small fs-small fas fa-map-marker-alt fc-pink"></i>
                  <span className="fs-small pr-small">{distance.toFixed(2)} km away</span>
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
                  <IconButton 
                    onClick= {this.handleJoinRoom}
                    iconClass="fas fa-comment-alt"
                  />
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


