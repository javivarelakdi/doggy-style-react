import React, { Component } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import Grid from "../components/Grid"
import users from '../data/users.json';

export default class GridView extends Component {
  render() {
    const headerNavElements = [
      {href: "", iconClass:"fas fa-user-circle"}, 
      {href: "", iconClass:"fas fa-sliders-h"}
    ];
    const footerNavElements = [
      {href: "", iconClass:"fas fa-border-all"}, 
      {href: "", iconClass:"fas fa-comment-alt"},
      {href: "", iconClass:"fas fa-star"},
      {href: "", iconClass:"fas fa-calendar"}
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


