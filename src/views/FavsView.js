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
          return fan;
        });
        const favs = user.data.favs.map((fav) => {
          return fav;
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
          <IconButton/>
        </Navbar>
        <Tabs 
          labels={["following", "followers"]} 
          activeTab={activeTab} 
          onClickTabItem={this.onClickTabItem}/>
        <Section hasNav hasTabs>
          <TabContent activeTab={activeTab}>
            <div label="following">
              {favs.length
                ? <Grid users={favs} columns={2} currentUserId={this.props.currentUser._id} isFavView={true}/>
                : <p className="pa-1">how come no favs yet? click on the star within a dog profile to add it to favourites</p>
              }
            </div>
            <div label="followers">
              {fans.length
                ? <Grid users={fans} columns={2} currentUserId={this.props.currentUser._id} isFavView={true}/>
                : <p className="pa-1">ouch! no fans yet, wait others dogs to add you to their favourites lists</p>
              }
            </div>
          </TabContent>
        </Section>
        <Navbar isFooter>
          <IconButton
            to="/"
            iconClass="fas fa-border-all"
          />
          <IconButton
            to="/chat"
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

      