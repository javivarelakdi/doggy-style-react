import React, { Component } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import Grid from "../components/Grid"
import Tabs from "../components/Tabs"
import TabContent from "../components/TabContent"

export default class FavsView extends Component {
  
  state = {activeTab : "following"}

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {

    const { currentUser } = this.props

    const headerNavElements = [
      {to: `/${currentUser._id}`, iconClass:"fas fa-user-circle"},
      {to: "", iconClass:"fas fa-sliders-h"}
    ];

    const footerNavElements = [
      {to: "/", iconClass:"fas fa-border-all"}, 
      {to: "", iconClass:"fas fa-comment-alt"},
      {to: "/favs", iconClass:"fas fa-star"},
      {to: "/events", iconClass:"fas fa-calendar"}
    ];
    
    const fans = currentUser.fans.map((user, i) => {
      return {username: "soy fan", img: user.imgUrl, id:  user._id};
    });
    const favs = currentUser.favs.map((user, i) => {
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

      