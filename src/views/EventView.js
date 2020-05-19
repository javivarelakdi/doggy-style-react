import React, { Component } from "react";
import Section from "../components/Section"
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";

export default class EventView extends Component {
  

  state = {
    event: null,
    isLoading: true,
    isAttending: false
  };

  componentDidMount() {
    apiClient
      .getEvent(this.props.match.params.id)
      .then((event) => {
        const attending = event.data.attendees.filter((att) => {
          return att._id === this.props.match.params.id
        })
        this.setState({
          isLoading: false,
          event: event.data,
          isAttending: attending.length > 0 ? true : false
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleChange = () => {
    apiClient
      .postEventAttendee(this.props.match.params.id, {isAttending: !this.state.isAttending})
      .then((event) => {
        const attending = event.data.attendees.filter((att) => {
          return att._id === this.props.match.params.id
        })
        this.setState({
          isAttending: attending.length > 0 ? true : false,
          event: event.data
        });
      })
      .catch(); 
  }


  // handleChange = () => {
  //   this.setState({
  //     isAttending: !this.state.isAttending
  //   });
  // }

  render() {
    const { event, isLoading } = this.state;
      
    return (
      <div className="App__container">
        {isLoading && <div> Loading.......</div>}
        {!isLoading && event && (
        <Section>
          <div className="profile__pic-container">
            <Link className="z-index-1000 pa-tl" to="/events"><i className="fas fa-chevron-left fc-pink" ></i></Link>
            <img src="/images/map.jpg" className="profile__pic-container__pic" alt="location"/>
          </div>
          <div >
            <div className="flex-row jc-between">
              <div className="flex-row col-8 pa-1">
                <h2 className="ellipsis col-12 pb-small">{event.name}</h2>
                <div className="pr-1">
                  <i className="pr-small fs-small fas fa-clock fc-pink"></i> 
                  <span className="fs-small">{`${event.initTime} - ${event.endTime}`}</span>
                </div>
                <div>
                  <i className="pr-small fs-small fas fa-map-marker-alt fc-pink"></i>
                  <span className="fs-small pr-small">2km away</span>
                </div>
              </div>
              <div className="col-4 pa-1">
                <select 
                  className="col-12 select select--button" 
                  name="isAttending"
                  value={this.state.isAttending}
                  onChange={() => this.handleChange}>
                  <option value="true">I´m coming</option> 
                  <option value="false">Not coming</option>
                </select>
              </div>
            </div>
            <p className="pr-1 pl-1">{event.description}</p>
            <p className="pr-1 pl-1 pt-1">Attendees:</p>
            <ul className="flex-row pa-1">
              {event.attendees.map((attendee, i) => {
                return <li 
                  className="col-2 grid-element grid-element--small" 
                  style={{backgroundImage: `url(${attendee.imgUrl})`}}
                  key={i}>
                  <Link className="col-12 flex-row ai-end jc-end" to={`/users/${attendee._id}`}>
                      <span className="bg-pink fs-small fc-white pl-small pr-small">{attendee.username}</span>
                  </Link>
                </li>
              })}
            </ul>
          </div>
        </Section>
        )}
      </div>
    );
  }
}


