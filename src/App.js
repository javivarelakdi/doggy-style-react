import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";

import { AnonRoute, PrivateRoute} from "./components";

import apiClient from "./services/apiClient";
import GridView from "./views/GridView";
import ProfileView from "./views/ProfileView";
import FavsView from "./views/FavsView";
import EventsView from "./views/EventsView";
import EventView from "./views/EventView";

const ProfileWithRouter  = withRouter(ProfileView);
const EventWithRouter  = withRouter(EventView);

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then(({data: user}) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null
        });
      });
  };

  handleSignup = ({ username, password, imgUrl, breed, gender, about, birth }) => {
    apiClient
      .signup({ 
        username, 
        password,
        imgUrl,
        breed,
        gender,
        about,
        birth
      })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null
        });
      });
  };

  handleLogout = () => {
    apiClient
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false,
          user: null
        });
      })
      .catch();
  };

  
  render() {
    
    const { isLoggedIn, isLoading, user } = this.state;
    return (
      <div>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className="App">
            <Switch>
              {/* <Route exact path={"/"} component={Home} /> */}
              <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                <Login onLogin={this.handleLogin} />
              </AnonRoute>
              <AnonRoute exact path={"/signup"} isLoggedIn={isLoggedIn}>
                <Signup onSignup={this.handleSignup} />
              </AnonRoute>
              <PrivateRoute exact path={"/"} isLoggedIn={isLoggedIn}>
                <GridView currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/events/:id"} isLoggedIn={isLoggedIn}>
                <EventWithRouter currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/events"} isLoggedIn={isLoggedIn}>
                <EventsView currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/favs"} isLoggedIn={isLoggedIn}>
                <FavsView currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/:id"} isLoggedIn={isLoggedIn}>
                <ProfileWithRouter currentUser={user} logout={this.handleLogout}/>
              </PrivateRoute>¡
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
