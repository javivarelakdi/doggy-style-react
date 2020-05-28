import React, { Component } from "react";
import io from "socket.io-client";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import IconButton from "../components/IconButton"
import { Link } from "react-router-dom"



export default class ChatView extends Component {


  state = { msg: "", chat: [] };


  componentDidMount() {
    this.socket = io.connect(process.env.REACT_APP_BACKEND_URI);
    //this.socket = io.connect('http://localhost:5000');
    const userTo=this.props.match.params.id
    this.socket.emit('join', {id: userTo });
    this.socket.on("newMessage", ({ msg }) => {
      const { username, imgUrl, _id } = this.props.currentUser
      this.setState({
        chat: [...this.state.chat, { msg, username, imgUrl, _id }]
      });
    });
  }

  // Function for getting text input
  onTextChange = e => {
    this.setState({ msg: e.target.value });
  };

  // Function for sending message to chat server
  onMessageSubmit = (e) => {
    e.preventDefault()
    const userTo = this.props.match.params.id;
    const msg = this.state.msg;
    this.socket.emit("newMessage", { userTo, msg });
    this.setState({ msg: "" });
  };

  render() {
    const { chat } = this.state;
    return (
      <div className="App__container">
        <Navbar>
          <IconButton
              iconClass="fas fa-chevron-left"
              to="/"
            />
          <h2 parentclass="col-6">chat room</h2>
          <IconButton
              iconClass="fas fa-comment-alt"
            />
        </Navbar>
        <Section hasNav>
          {chat.map(({ id, msg, username, imgUrl, _id }, i) => (
            <div key={i} className={`flex-row ${this.props.currentUser.username === username && "jc-end"}`}>
              <div 
                className={`flex-row col-9 pa-1 jc-between mr-1 ml-1 mb-1 ${this.props.currentUser.username === username 
                ? "ba-white bg-pink row-reverse"
                : "ba-pink bg-white fc-pink"}`}>
                <div className="col-3">
                  <div 
                    className="grid-element grid-element--small" 
                    style={{backgroundImage: `url(${imgUrl})`}}>
                    <Link className="col-12 flex-row" to={`/users/${_id}`}/>
                  </div>
                </div>
                <p 
                  className={`col-7 pr-small pl-small fs-small ${this.props.currentUser.username === username && "ta-right"}`}
                >
                {msg}
                </p>
                <div className="col-2 flex-row ai-end">
                  <p className="fs-small">15:47</p>
                </div>
              </div>
            </div>
          ))};
        </Section>
        <Navbar isFooter isChat>
          <form className="flex-row jc-between full-height" onSubmit={this.onMessageSubmit}>
            <input 
              type="text" 
              className="col-9"
              value={this.state.msg}
              onChange={e => this.onTextChange(e)}
              />
            <IconButton
              iconClass="fas fa-paper-plane"
              type="submit"
              buttonClass="col-3"
            />
          </form>
        </Navbar>
      </div>
    );
  }
}


