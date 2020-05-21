import React, { Component } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import EventCard from "../components/EventCard"
import Form from "../components/Form"
import IconButton from "../components/IconButton"
import Field from "../components/Field"
import apiClient from "../services/apiClient";

export default class EventsView extends Component {

  state = {
    screen: "list",
    name:"",
    descripton:"",
    date:"",
    initTime:"",
    endTime:"",
    owner: this.props.currentUser._id,
    events:null,
    isLoading:true
  }

  componentDidMount() {
    apiClient
      .getEvents()
      .then((events) => {
        this.setState({
          isLoading: false,
          events: events.data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          events: null,
        });
      });
  }

  checkIfUserAttends = (event) => {
    if (event.owner._id === this.props.currentUser._id) {
      return true
    } else {
      const isAttending = event.attendees.filter(att => att._id === this.props.currentUser._id);
      return isAttending.length ? true : false;
    }
  }

  changeScreen = () => {
    this.setState({
      screen: this.state.screen === "list" ? "form" : "list"
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    return; 
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {

    
    return (
      
      <div className="App__container">
      {this.state.isLoading && <div> Loading.......</div>}
      {!this.state.isLoading && (
        <>
        <Navbar>
          <IconButton
            to={`/${this.props.currentUser._id}`}
            iconClass="fas fa-user-circle"
          />
          <IconButton
            iconClass={this.state.screen === "list" ? "fas fa-plus-circle" : "fas fa-list"}
            onClick= {this.changeScreen}
          />
        </Navbar>
        <Section hasNav>
          { this.state.screen === "list" ?
          <ul className="flex-row pt-1 pr-1 pl-1">
            {this.state.events.map((event, i) => {
              return (
                <EventCard
                  key={i}
                  title={event.name}
                  description={event.description}
                  timeSlot={`${event.initTime} - ${event.endTime}`}
                  location="2km away"
                  attendees={event.attendees.length}
                  isUserAttending={this.checkIfUserAttends(event)}
                  ownerName={event.owner.username}
                  ownerImgUrl={event.owner.imgUrl}
                  id={event._id}
                />
              );
            })}     
          </ul>
          : 
          <>
            <div className="profile__pic-container">
              <img src="/images/dog-office-meeting.jpg" className="profile__pic-container__pic" alt=""/>
            </div>
            <h1><span className="bg-pink fs-big">Create event</span></h1>
            <Form 
              onSubmit={this.handleSubmit}>
              <Field
                label="name"
                type="text"
                name="name"
                onChange={this.handleChange}
                />
              <Field
                label="description"
                type="text"
                name="description"
                onChange={this.handleChange}
                />
              <Field             
                label="date"
                type="date"
                name="date"
                onChange={this.handleChange}
                />
              <Field 
                label="initial time"
                type="time"
                name="initTime"
                onChange={this.handleChange}
                />
              <Field
                label="end time"
                type="time"
                name="endTime"
                onChange={this.handleChange}
                />
              <Field
                value={this.state.owner}
                type="hidden"
                name="owner"
                />
            </Form>
          </>
        }
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
      </>)}
      </div>
    );
  }
}

      