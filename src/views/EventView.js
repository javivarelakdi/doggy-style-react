import React, { Component } from "react"
import Section from "../components/Section"
import Form from "../components/Form"
import IconButton from "../components/IconButton"
import Field from "../components/Field"
import { Link } from "react-router-dom"
import apiClient from "../services/apiClient"
import Loading from "../components/Loading"
import Error from "../components/Error"
import Map from "../components/Map"


export default class EventView extends Component {
  

  state = {
    event: null,
    isLoading: true,
    isAttending: false,
    editing: false,
    name: "",
    description: "",
    date: "",
    initTime:"",
    endTime: "",
    errorStatus: "",
    lng:"",
    lat:""
  };

  componentDidMount() {
    apiClient
      .getEvent(this.props.match.params.id)
      .then((event) => {
        const attending = event.data.attendees.filter((att) => {
          return att._id === this.props.currentUser._id
        })
        this.setState({
          isLoading: false,
          event: event.data,
          isAttending: attending.length > 0 ? true : false,
          name: event.data.name,
          description: event.data.description,
          date: event.data.date,
          initTime: event.data.initTime,
          endTime: event.data.endTime,
          lng: event.data.location.coordinates[0],
          lat: event.data.location.coordinates[1]
        });
      })
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          errorStatus: error.response.status
        });
      });
  }

  changeScreen = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleToggleAttendee = () => {
    apiClient
      .postEventAttendee(this.props.match.params.id, {isAttending: !this.state.isAttending})
      .then((event) => {    
        const attending = event.data.attendees.filter((att) => {
          return att._id === this.props.currentUser._id
        })    
        this.setState({
          event: event.data,
          isAttending: attending.length > 0 ? true : false
        });
      })
      .catch(({...error}) => {
        this.setState({
          errorStatus: error.response.status
        });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    apiClient
      .editEvent(this.props.match.params.id, {
        locId: this.state.event.location._id,
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
        initTime: this.state.initTime,
        endTime: this.state.endTime,
        lng: this.state.lng,
        lat: this.state.lat
      })
      .then((event) => {    
        this.setState({
          event: event.data,
          editing: false
        });
      })
      .catch(({...error}) => {
        this.setState({
          errorStatus: error.response.status
        });
      });
  };

  handleDeleteSubmit = (e) => {
    e.preventDefault();
    apiClient
      .deleteEvent(this.props.match.params.id)
      .then(() => {    
        this.props.history.push("/events", { from: this.props.location })
      })
      .catch(({...error}) => {
        this.setState({
          errorStatus: error.response.status
        });
      });
  } 

  handleLocation = (lng, lat) =>{
    this.setState({
      lng,
      lat
    });
  }

  render() {
    const { event, isLoading, editing, name, description, date, initTime, endTime, errorStatus, lng, lat } = this.state;
      
    return (
      <div className="App__container">
        {isLoading && <Loading/>}
        {!isLoading && errorStatus && <Error status={errorStatus}/>}
        {!isLoading && event && !errorStatus &&
        <Section>
          {!editing ?
          <>
          <div className="profile__pic-container">
            <IconButton
              buttonClass="z-index-1000 pa-tl"
              iconClass="fas fa-chevron-left"
              to="/events"
            />
            {event.owner._id === this.props.currentUser._id &&
              <IconButton
              buttonClass="z-index-1000 pa-tr"
              iconClass="fas fa-edit"
              onClick= {this.changeScreen}
            />
            }
            <Map 
              lng={lng} 
              lat={lat} 
              zoom={13} 
              mapType={"profileMap"}
              containerClass="profile__pic-container__map"
              handleLocation={this.handleLocation}
              />
          </div>
          <div >
            <div className="flex-row jc-between">
              <div className="flex-row col-8 pa-1">
                <h2 className="ellipsis col-12 pb-small">{name}</h2>
                <div className="pr-1">
                  <i className="pr-small fs-small fas fa-clock fc-pink"></i> 
                  <span className="fs-small">{`${initTime} - ${endTime}`}</span>
                </div>
                <div>
                  <i className="pr-small fs-small fas fa-map-marker-alt fc-pink"></i>
                  <span className="fs-small pr-small">2km away</span>
                </div>
              </div>
              { event.owner._id !== this.props.currentUser._id &&
                <div className="col-4 pa-1">
                  <select 
                    className="col-12 select select--button" 
                    name="isAttending"
                    value={this.state.isAttending}
                    onChange={this.handleToggleAttendee}>
                    <option value="true">I´m coming</option> 
                    <option value="false">Not coming</option>
                  </select>
                </div>
              }
            </div>
            <p className="pr-1 pl-1">{description}</p>
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
          </>
          :
          <>
          <div className="profile__pic-container">
            <IconButton
            buttonClass="z-index-1000 pa-tl"
            iconClass="fas fa-chevron-left"
            onClick= {this.changeScreen}/>
             <Map 
              lng={lng} 
              lat={lat}
              zoom={13} 
              mapType={"editMap"}
              containerClass="profile__pic-container__map"
              handleLocation={this.handleLocation}
              />
          </div>
          <Form 
            onSubmit={this.handleSubmit}>
            <Field
              label="name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              />
            <Field
              label="description"
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange}
              />
            <Field             
              label="date"
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              />
            <Field 
              label="initial time"
              type="time"
              name="initTime"
              value={initTime}
              onChange={this.handleChange}
              />
            <Field
              label="end time"
              type="time"
              name="endTime"
              value={endTime}
              onChange={this.handleChange}
              />
          </Form>
          <Form 
            onSubmit={this.handleDeleteSubmit} 
            submitButtonText="cancel event">
          </Form>
          </>
          }
        </Section>
        }
      </div>
    );
  }
}


