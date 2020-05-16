import React, { Component } from "react";
import Section from "../components/Section"
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";

export default class ProfileView extends Component {
  

  state = {
    user: null,
    isLoading: true,
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

  render() {
    const { user, isLoading } = this.state;
    return (
      <div className="App__container">
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
        <Section>
          <div className="profile__pic-container">
            <Link className="z-index-1000 pa-tl" to="/"><i className="fas fa-chevron-left fc-pink" ></i></Link>
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
        </Section>
        )}
      </div>
    );
  }
}


