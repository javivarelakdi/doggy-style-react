import React, { Component } from "react";
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import events from "../data/events.json";
import EventCard from "../components/EventCard"

export default class EventListView extends Component {

  checkIfUserAttends = () => {
    return events.attendees.filter(att => att._id === this.props.currentUser._id);
  }

  render() {
    const headerNavElements = [
      {to: `/${this.props.currentUser._id}`, iconClass:"fas fa-user-circle"},
      {to: "", iconClass:""},
      {to: "", iconClass:"fas fa-plus-circle"},
      {to: "", iconClass:"fas fa-sliders-h"}
    ];
    const footerNavElements = [
      {to: "/", iconClass:"fas fa-border-all"}, 
      {to: "", iconClass:"fas fa-comment-alt"},
      {to: "/favs", iconClass:"fas fa-star"},
      {to: "/events", iconClass:"fas fa-calendar"}
    ];
    
    return (
      <div className="App__container">
        <Navbar elements={headerNavElements}></Navbar>
        <Section hasNav>
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
        </Section>
        <Navbar elements={footerNavElements} isFooter></Navbar>
      </div>
    );
  }
}

      