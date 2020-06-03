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
    errorStatus: "",
    showSearch: false,
    search: "",
    isFiltered: false
  }

  async componentDidMount() {
    try {
      const serverChats = await apiClient.getChats();
      const chatsWithOtherName = serverChats.data.map((chat) => {
        const theOther = chat.users.filter(user => user._id !== this.props.currentUser._id);
        chat.theOtherName = theOther[0].username;
        return chat;
      });
      this.setState({
        isLoading: false,
        chats: chatsWithOtherName
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        // errorStatus: error.response.status
      });
    } 
  }

  handleFilter = (e) => {
    this.setState({
      search: e.target.value,
    });
    let { chats } = this.state;
    if (chats.length > 0) {
      const filtered = chats.filter((chat) => {
        return chat.theOtherName.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
      });
      this.setState({
        filtered: filtered,
        isFiltered: filtered.length > 0 ? true : false
      })
    }
  };

  handleRedirect = (chatId) => {
    this.props.history.push(`/chat/${chatId}`, { from: this.props.location })
  }


  render() {

    const { isLoading } = this.state;
    const chats = this.state.isFiltered === true ? this.state.filtered : this.state.chats;
    return (
      
      <div className="App__container">
        {isLoading && <Loading/>}
        {/* {!isLoading && errorStatus && <Error status={errorStatus}/>} */}
        {/* {!isLoading && !errorStatus && */}
        {!isLoading &&
        <>
        <Navbar isChat>
          <ul className="flex-row jc-between full-height">
            <li className="pl-1 pr-1 col-3 ta-center as-center fc-pink">
              <IconButton
                iconClass="fas fa-chevron-left"
                onClick={this.props.history.goBack}
              />
            </li>
            <li className="pl-1 pr-1 col-9 ta-center as-center fc-pink">
            <input 
                type="text" 
                className="pt-small"
                value={this.state.search}
                name="search"
                placeholder="look for a dog"
                onChange={this.handleFilter}/>
            <IconButton
              buttonClass="pt-1"
              iconClass="fas fa-search"
            />
            </li>
          </ul>
          
        </Navbar>
        <Section hasNav>
        <ul className="flex-row pt-1 pr-1 pl-1">
            { chats.length > 0 && chats.map((chat, i) => {
              const lastMessage =  chat.messages.length ? chat.messages[chat.messages.length - 1] : null;
              const theOther = chat.users.filter(user => user._id !== this.props.currentUser._id);
              const isMine = lastMessage && lastMessage.sender._id ===  this.props.currentUser._id ? true : false
              return (
                chat.messages.length > 0 &&
                <ChatCard
                  key={i}
                  title={theOther[0].username}
                  time={dateFormatter.timeFormat(lastMessage.createdAt)}
                  imgUrl={theOther[0].imgUrl}
                  isMine={isMine}
                  content={lastMessage.content}
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

      