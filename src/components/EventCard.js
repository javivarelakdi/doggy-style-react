import React, { Component } from "react";

export default class EventCard extends Component {
  render() {
    const { title, description, timeSlot, date, attendees, isUserAttending, ownerName, ownerImgUrl, onClick} = this.props;
   
    return (
      <li className="flex-row col-12 pa-1 mb-1 ba-white bg-pink" onClick={onClick}>

            <div className="col-9 pr-1">
                <div>
                  <h2 className="ellipsis">{title}</h2>
                  <p className="fs-small ellipsis">{description}</p>
                </div>
                <div className="flex-column col-12 jc-between pt-1">
                  {/* <div className="col-12">
                    <span className="fs-small"><i className="pr-small fs-small fas fa-map-marker-alt"></i>{location}</span>
                  </div> */}
                  <div className="col-12">
                    <span className="fs-small"><i className="pr-small fs-small far fa-calendar"></i>{date}</span>
                  </div>
                  <div className="col-12">
                    <span className="fs-small"><i className="pr-small fs-small fas fa-clock"></i>{timeSlot}</span>
                  </div>
              </div>
            </div>
            <div className="col-3 flex-column jc-between">
                <p className="fs-small ta-right"><i className="pr-small fas fa-user fa-sm"></i>{attendees}</p>
                <p className="fs-small ta-right">{isUserAttending ? "I´m going" : "not going"}</p>
                <p className="fs-small fw-bold ta-right">Host: {ownerName}</p>
                <div className="grid-element grid-element--small flex-row ai-end jc-end" 
                  style={{backgroundImage: `url(${ownerImgUrl})`}}>
                </div>
            </div>

      </li>
    );
  }
}


