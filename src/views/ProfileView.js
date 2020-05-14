import React, { Component } from "react";
import Section from "../components/Section"
import users from '../data/users.json';
import { Link } from "react-router-dom";

export default class ProfileView extends Component {
  
  getUser = (id) => {
    const theUser = oneUser => {
        return oneUser._id === id;
    }
    return users.find(theUser)
  };

  render() {
    const { params } = this.props.match;
    const foundUser = this.getUser(params.id);
    return (
      <div className="App__container">
        <Section>
          
          <div className="profile__pic-container">
            <Link className="z-index-1000 pa-tl" to="/"><i className="fas fa-chevron-left fc-pink" ></i></Link>
            <img src={foundUser.imgUrl} className="profile__pic-container__pic" alt={foundUser.username}/>
          </div>

          <div>
            <div className="flex-row jc-between">
              <div className="flex-row col-8 pa-1">
                <h2 className="ellipsis col-12 pb-small">{foundUser.username}</h2>
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
            <p className="pr-1 pl-1 pb-1">{foundUser.about}</p>
            <ul className="pr-1 pl-1 flex-row">
              <li className="flex-row col-12 bb-white pb-1">
                  <span className="flex-row col-4">Breed:</span>
                  <span className="flex-row col-8">{foundUser.breed}</span>
              </li>
              <li className="flex-row col-12 bb-white pb-1 pt-1">
                  <span className="flex-row col-4">Birth:</span>
                  <span className="flex-row col-8">{foundUser.birth}</span>
              </li>
              <li className="flex-row col-12 pt-1">
                  <span className="flex-row col-4">Gender:</span>
                  <span className="flex-row col-8">{foundUser.gender}</span>
              </li>
            </ul>
          </div>

        </Section>
      </div>
    );
  }
}


