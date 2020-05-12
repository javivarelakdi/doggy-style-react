import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";

import Login from "./views/Login";

import { AnonRoute, PrivateRoute} from "./components";

import apiClient from "./services/apiClient";
import GridView from "./views/GridView";
import ProfileView from "./views/ProfileView";
import FavsView from "./views/FavsView";

const ProfileViewWithRouter  = withRouter(ProfileView);
const FavsWithRouter  = withRouter(FavsView);

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
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
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  
  render() {
    
    const { isLoggedIn, isLoading } = this.state;
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
              <PrivateRoute exact path={"/"} isLoggedIn={isLoggedIn}>
                <GridView />
              </PrivateRoute>
              <PrivateRoute exact path={"/favs/:id"} isLoggedIn={isLoggedIn}>
                <FavsWithRouter/>
              </PrivateRoute>
              <PrivateRoute exact path={"/:id"} isLoggedIn={isLoggedIn}>
                <ProfileViewWithRouter/>
              </PrivateRoute>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
