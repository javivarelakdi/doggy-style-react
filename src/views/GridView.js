import React, { Component } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import Grid from "../components/Grid"
import IconButton from "../components/IconButton"
import apiClient from "../services/apiClient";

export default class GridView extends Component {
  
  state = {
    users: [],
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .getUsers()
      .then((users) => {
        const formatUsers = users.data.map((user, i) => {
          return {username: user.username, img: user.imgUrl, id:  user._id};
        })
        this.setState({
          isLoading: false,
          users: formatUsers
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          users: []
        });
      });
  }

  formatUsers() {

  }
  
  render() {

    return (
      <div className="App__container">
      {this.state.isLoading && <div> Loading.......</div>}
      {!this.state.isLoading && (
        <>
        <Navbar>
          <IconButton
              to={`/${this.props.currentUser._id}`}
              iconClass="fas fa-user-circle"
            />
          <IconButton
              iconClass="fas fa-sliders-h"
            />
        </Navbar>
        <Section hasNav>
          <Grid data={this.state.users}/>
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
        </>
      )}
      </div>
    );
  }
}


