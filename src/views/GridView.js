import React, { Component } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import Grid from "../components/Grid"
import users from '../data/users.json';

export default class GridView extends Component {
  render() {
    const headerNavElements = [
      {to: `/${this.props.currentUser._id}`, iconClass:"fas fa-user-circle", isLink: true},
      {iconClass:"fas fa-sliders-h", isLink: false, onClick: null}
    ];
    const footerNavElements = [
      {to: "/", iconClass:"fas fa-border-all", isLink: true}, 
      {to: "/", iconClass:"fas fa-comment-alt", isLink: true},
      {to: "/favs", iconClass:"fas fa-star", isLink: true},
      {to: "/events", iconClass:"fas fa-calendar", isLink: true}
    ];

    const data = users.map((user, i) => {
      return {username: user.username, img: user.imgUrl, id:  user._id};
    });
    
    return (
      <div className="App__container">
        <Navbar elements={headerNavElements}></Navbar>
        <Section hasNav>
          <Grid data={data}/>
        </Section>
        <Navbar elements={footerNavElements} isFooter></Navbar>
      </div>
    );
  }
}


