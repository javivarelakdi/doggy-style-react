import React, { Component } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import Grid from "../components/Grid"
import Tabs from "../components/Tabs"
import user from "../data/user.json";
import TabContent from "../components/TabContent"

export default class FavsView extends Component {
  
  state = {activeTab : "following"}

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

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
    
    const fans = user.fans.map((user, i) => {
      return {username: "soy fan", img: user.imgUrl, id:  user._id};
    });
    const favs = user.favs.map((user, i) => {
      return {username: "soy fav", img: user.imgUrl, id:  user._id};
    });
    
    return (
      <div className="App__container">
        <Navbar elements={headerNavElements}></Navbar>
        <Tabs 
          labels={["following", "followers"]} 
          activeTab={this.state.activeTab} 
          onClickTabItem={this.onClickTabItem}/>
        <Section hasNav hasTabs>
          <TabContent activeTab={this.state.activeTab}>
            <div label="following">
              <Grid data={favs} columns={2}/>
            </div>
            <div label="followers">
              <Grid data={fans} columns={2}/>
            </div>
          </TabContent>
        </Section>
        <Navbar elements={footerNavElements} isFooter></Navbar>
      </div>
    );
  }
}

      