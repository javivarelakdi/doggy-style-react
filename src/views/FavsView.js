import React, { Component } from "react"
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import Grid from "../components/Grid"
import Tabs from "../components/Tabs"
import TabContent from "../components/TabContent"
import IconButton from "../components/IconButton"
import apiClient from "../services/apiClient"
import Loading from "../components/Loading"
import Error from "../components/Error"

export default class FavsView extends Component {
  
  state = {
    activeTab : "following",
    isLoading: true,
    favs:[],
    fans:[],
    errorStatus:""
  }

  componentDidMount() {
    apiClient
      .getUser(this.props.currentUser._id)
      .then((user) => {
        const fans = user.data.fans.map((fan) => {
          return {username: fan.username, img: fan.imgUrl, id:  fan._id};
        });
        const favs = user.data.favs.map((fav) => {
          return {username: fav.username, img: fav.imgUrl, id:  fav._id};
        });
        this.setState({
          isLoading: false,
          favs,
          fans
        });
      })
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          errorStatus: error.response.status
        });
      });
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {

    const {favs, fans, activeTab, isLoading, errorStatus} = this.state;
    
    return (
      <div className="App__container">
        {isLoading && <Loading/>}
        {!isLoading && errorStatus && <Error status={errorStatus}/>}
        {!isLoading && !errorStatus &&
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
        <Tabs 
          labels={["following", "followers"]} 
          activeTab={activeTab} 
          onClickTabItem={this.onClickTabItem}/>
        <Section hasNav hasTabs>
          <TabContent activeTab={activeTab}>
            <div label="following">
              <Grid data={favs} columns={2}/>
            </div>
            <div label="followers">
              <Grid data={fans} columns={2}/>
            </div>
          </TabContent>
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
        } 
      </div>
    );
  }
}

      