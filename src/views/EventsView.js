import React, { Component, Fragment } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import events from "../data/events.json";
import EventCard from "../components/EventCard"
import Form from "../components/Form"
import Field from "../components/Field"
import { Link } from "react-router-dom";

export default class EventsView extends Component {

  state = {
    screen: "form",
    name:"",
    descripton:"",
    date:"",
    initTime:"",
    endTime:"",
    owner: this.props.currentUser._id
  }

  checkIfUserAttends = () => {
    return events.attendees.filter(att => att._id === this.props.currentUser._id);
  }

  changeScreen = () => () => {
    this.setState({
      screen: this.state.screeen === "list" ? "form" : "list"
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
    const headerNavElements = [
      {to: `/${this.props.currentUser._id}`, iconClass:"fas fa-user-circle", isLink: true},
      {iconClass:"", isLink: false, onClick: null},
      {iconClass:"fas fa-plus-circle", isLink: false, onClick: this.changeScreen},
      {iconClass:"fas fa-sliders-h", isLink: false, onClick: null}
    ];
    const footerNavElements = [
      {to: "/", iconClass:"fas fa-border-all", isLink: true}, 
      {to: "/", iconClass:"fas fa-comment-alt", isLink: true},
      {to: "/favs", iconClass:"fas fa-star", isLink: true},
      {to: "/events", iconClass:"fas fa-calendar", isLink: true}
    ];
    
    return (
      
      <div className="App__container">
        <Navbar elements={headerNavElements}></Navbar>
        <Section hasNav>
          { this.state.screen === "list" ?
          <ul className="flex-row pt-1 pr-1 pl-1">
            {events.map((event, i) => {
              return (
                <EventCard
                  key={i}
                  title={event.name}
                  description={event.description}
                  timeSlot={`${event.initTime} - ${event.endTime}`}
                  location="2km away"
                  attendees={event.attendees.length}
                  isUserAttending={this.checkIfUserAttends}
                  ownerName={event.owner.username}
                  ownerImgUrl={event.owner.imgUrl}
                  id={event._id}
                />
              );
            })}     
          </ul>
          : 
          <Fragment>
            <div className="profile__pic-container">
              <Link className="z-index-1000 pa-tl" to="/"><i className="fas fa-chevron-left fc-pink" ></i></Link>
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
                name="endTime"
                />
            </Form>
          </Fragment>
        }
        </Section>
        <Navbar elements={footerNavElements} isFooter></Navbar>
      </div>
    );
  }
}

      