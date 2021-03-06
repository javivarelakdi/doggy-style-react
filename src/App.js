import React, { Component } from "react"
import { Switch, withRouter } from "react-router-dom"
import Login from "./views/Login"
import Signup from "./views/Signup"
import { AnonRoute, PrivateRoute} from "./components"
import Loading from "./components/Loading"
import Error from "./components/Error"
import apiClient from "./services/apiClient"
import GridView from "./views/GridView"
import ProfileView from "./views/ProfileView"
import FavsView from "./views/FavsView"
import ChatView from "./views/ChatView"
import ChatsView from "./views/ChatsView"
import EventsView from "./views/EventsView"
import EventView from "./views/EventView"

const ProfileWithRouter  = withRouter(ProfileView);
const EventWithRouter  = withRouter(EventView);
const EventsWithRouter  = withRouter(EventsView);
const ChatWithRouter  = withRouter(ChatView);
const ChatsWithRouter  = withRouter(ChatsView);

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    errorStatus:""
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
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user:null
        });
      });
  }

  handleLogin = ({ username, password, lng, lat }) => {
    apiClient
      .login({ username, password, lng, lat })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user
        });
      })
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          errorStatus: error.response.status
        });
      });
  };

  handleSignup = ({ username, password, imgUrl, breed, gender, about, birth, lng, lat }) => {
    apiClient
      .signup({ 
        username, 
        password,
        imgUrl,
        breed,
        gender,
        about,
        birth,
        lng,
        lat
      })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user
        });
      })
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          errorStatus: error.response.status
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
      .catch(({...error}) => {
        this.setState({
          errorStatus: error.response.status
        });
      });
  };

  
  render() {
    
    const { isLoggedIn, isLoading, user, errorStatus} = this.state;
    return (
      <>
        {isLoading && <Loading/>}
        {!isLoading && errorStatus && <Error status={errorStatus}/>}
        {!isLoading && !errorStatus &&
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
                <EventsWithRouter currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/favs"} isLoggedIn={isLoggedIn}>
                <FavsView currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/chat/:id"} isLoggedIn={isLoggedIn}>
                <ChatWithRouter currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/chat"} isLoggedIn={isLoggedIn}>
                <ChatsWithRouter currentUser={user}/>
              </PrivateRoute>
              <PrivateRoute exact path={"/:id"} isLoggedIn={isLoggedIn}>
                <ProfileWithRouter currentUser={user} logout={this.handleLogout}/>
              </PrivateRoute>¡
            </Switch>
          </div>
        }
      </>
    );
  }
}

export default App;
