import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EventCard extends Component {
  render() {
    const { id, title, description, timeSlot, location, attendees, isUserAttending, ownerName, ownerImgUrl} = this.props;
   
    return (
      <li className="flex-row col-12 pa-1 mb-1 ba-white bg-pink">
        <div className="flex-row col-12">
            <div className="col-9 pr-1">
                <h2 className="ellipsis">{title}</h2>
                <p className="fs-small ellipsis">{description}</p>
                <p className="fs-small">{timeSlot}</p>
            </div>
            <div className="col-3">
                <p className="fs-small fw-bold ta-right">Host: {ownerName}</p>
                <div className="grid-element grid-element--small flex-row ai-end jc-end" 
                  style={{backgroundImage: `url(${ownerImgUrl})`}}>
                </div>
            </div>
        </div>
        <div className="flex-row col-12 jc-between pt-1">
            <div className="col-3 pr-1">
              <p className="fs-small">Location:</p>
              <p className="fs-small"><i className="pr-small fs-small fas fa-map-marker-alt"></i>{location}</p>
            </div>
            <div className="col-3 fs-small pr-1">
              <p className="fs-small">Coming:</p>
              <p className="fs-small"><i className="fas fa-user fa-sm"></i> {attendees}</p>
            </div>
            <div className="col-3 pr-1">
              <p className="fs-small">{isUserAttending ? "I´m going" : "I´m not going"}</p>
            </div>
            <div className="col-3 ta-right">
              <Link to={`/events/${id}`}><button className="button button--secondary">See details</button></Link> 
            </div>
        </div>
      </li>
    );
  }
}


