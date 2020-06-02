import React, { Component } from "react"
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import IconButton from "../components/IconButton"
import apiClient from "../services/apiClient"
import Loading from "../components/Loading"
//import Error from "../components/Error"
import ChatCard from "../components/ChatCard"
import dateFormatter from "../utils/dateFormatter"

export default class ChatsView extends Component {

  state = {
    isLoading: true, 
    chats: [],
    errorStatus: ""
  }

  async componentDidMount() {
    try {
      const serverChats = await apiClient.getChats();
      //const filteredChats = await this.filterChats(serverChats.data);
      this.setState({
        isLoading: false,
        chats: serverChats.data
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        // errorStatus: error.response.status
      });
    } 
  }

  handleRedirect = (chatId) => {
    this.props.history.push(`/chat/${chatId}`, { from: this.props.location })
  }

  // filterChats = (chats) => {
    // return chats.filter((chat) => {
    //   return chat.users.filter((user) => {
    //     console.log(user)
    //     return this.props.currentUser._id === user._id;
    //   })
    // })
    
    // const filtered =  chats.filter((chat) => {
    //   return chat.users.includes((user) => {
    //     return user._id === this.props.currentUser._id
    //   })
    // });

    // return filtered;


  // }

  render() {

    const { isLoading, chats} = this.state;
    return (
      
      <div className="App__container">
        {isLoading && <Loading/>}
        {/* {!isLoading && errorStatus && <Error status={errorStatus}/>} */}
        {/* {!isLoading && !errorStatus && */}
        {!isLoading &&
        <>
        <Navbar>
          <IconButton
            to={`/${this.props.currentUser._id}`}
            iconClass="fas fa-user-circle"
          />
          <IconButton
            iconClass="fas fa-search"
          />
        </Navbar>
        <Section hasNav>
        <ul className="flex-row pt-1 pr-1 pl-1">
            { chats.length > 0 && chats.map((chat, i) => {
              return (
                chat.messages.length > 0 &&
                <ChatCard
                  key={i}
                  title={chat.messages[0].sender.username}
                  time={dateFormatter.timeFormat(chat.messages[0].createdAt)}
                  imgUrl={chat.messages[0].sender.imgUrl}
                  content={chat.messages[0].content}
                  onClick={() => this.handleRedirect(chat._id)}
                />
              );
            })}     
          </ul>
        </Section>
        <Navbar isFooter>
          <IconButton
            to="/"
            iconClass="fas fa-border-all"
          />
          <IconButton
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

      