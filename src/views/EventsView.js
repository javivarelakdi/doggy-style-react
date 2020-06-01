import React, { Component } from "react"
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import EventCard from "../components/EventCard"
import Form from "../components/Form"
import IconButton from "../components/IconButton"
import Field from "../components/Field"
import apiClient from "../services/apiClient"
import Loading from "../components/Loading"
import Error from "../components/Error"
import Map from "../components/Map"

export default class EventsView extends Component {

  state = {
    screen: "list",
    name:"",
    descripton:"",
    date:"",
    initTime:"",
    endTime:"",
    events:[],
    isLoading:true,
    errorStatus: "",
    lng:"",
    lat:"",
    nameValid: false,
    descriptionValid: false,
    dateValid: false,
    initValid: false,
    endValid: false,
    formErrors: {name: "", description: "", date: "", init: "", end: ""}
  }

  componentDidMount() {
    apiClient
      .getEvents()
      .then((events) => {
        this.setState({
          isLoading: false,
          events: events.data
        });
      })
      .catch(({...error}) => {
        this.setState({
          isLoading: false,
          errorStatus: error.response.status
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
    apiClient
      .createEvent({
        owner: this.props.currentUser,
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
        initTime:this.state.initTime,
        endTime: this.state.endTime,
        lng: this.state.lng,
        lat: this.state.lat
      })
      .then((event) => {    
        this.setState({
          events: [...this.state.events, event.data],
          screen: "list"
        });
      })
      .catch(({...error}) => {
        this.setState({
          errorStatus: error.response.status
        });
      });
  };

  handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    this.setState(
      {[e.target.name]: e.target.value},
      () => { this.validateField(fieldName, value) }
    );
  };

  handleLocation = (lng, lat) =>{
    this.setState({
      lng,
      lat
    });
  }

  handleRedirect = (eventId) => {
    this.props.history.push(`/events/${eventId}`, { from: this.props.location })
  }

  validateField = (fieldName, value) => {
    let {formErrors, nameValid, descriptionValid, dateValid, initValid, endValid } = this.state
    
  
    switch(fieldName) {
      case 'name':
        nameValid = value.length > 6 && value.length < 20; 
        formErrors.name = nameValid ? '' : 'description is lower than 6 characters or higher than 20 characters';
        break;
      case 'description':
        descriptionValid = value.length > 6 && value.length < 120;
        formErrors.description = descriptionValid ? '': 'description is lower than 6 characters or higher than 120 characters';
        break;
      case 'date':
        dateValid = new Date(value).getTime() > new Date().getTime()
        formErrors.date = dateValid ? '': 'date must be a day in the future';
        break;
      case 'initTime':
        initValid = value.match(/\d+:\d+/);
        formErrors.init = initValid ? '': 'enter a valid time format';
        break;
      case 'endTime':
        endValid = value.match(/\d+:\d+/);
        formErrors.end = endValid ? '': 'enter a valid time format';
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      nameValid,
      descriptionValid,
      dateValid,
      initValid,
      endValid
    }, this.validateForm);
  }

  validateForm = () => {
    let { nameValid, descriptionValid, dateValid, initValid, endValid } = this.state
    this.setState({formValid: nameValid && descriptionValid && dateValid && initValid && endValid});
  }

  render() {

    const { screen, events, isLoading, errorStatus, formErrors } = this.state;
    return (
      
      <div className="App__container">
        {isLoading && <Loading/>}
        {!isLoading && errorStatus && <Error status={errorStatus}/>}
        {!isLoading && !errorStatus &&
        <>
        <Navbar>
          <IconButton
            to={`/${this.props.currentUser._id}`}
            iconClass="fas fa-user-circle"
          />
          <IconButton
            iconClass={screen === "list" ? "fas fa-plus-circle" : "fas fa-list"}
            onClick= {this.changeScreen}
          />
        </Navbar>
        <Section hasNav>
          { screen === "list" ?
          <ul className="flex-row pt-1 pr-1 pl-1">
            { events.map((event, i) => {
              const eventDate = new Date(event.date);
              const formattedEventDate = new Intl.DateTimeFormat('en-GB').format(eventDate)
              return (
                <EventCard
                  key={i}
                  title={event.name}
                  date={formattedEventDate}
                  description={event.description}
                  timeSlot={`${event.initTime} - ${event.endTime}`}
                  location="2km away"
                  attendees={event.attendees ? event.attendees.length : 0}
                  isUserAttending={this.checkIfUserAttends(event)}
                  ownerName={event.owner.username}
                  ownerImgUrl={event.owner.imgUrl}
                  id={event._id}
                  onClick={() => this.handleRedirect(event._id)}
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
            <div className="flex-row jc-between pt-1 pr-1 pl-1">
              <p className="col-4 ">Choose location</p>
              <Map 
                zoom={13} 
                mapType={"newMap"}
                containerClass="col-8 new-event-map"
                handleLocation={this.handleLocation}
                />
            </div>
            <Form 
              onSubmit={this.handleSubmit}
              disabled={!this.state.formValid}>
              <Field
                label="name"
                type="text"
                validationError={formErrors.name}
                name="name"
                onChange={this.handleChange}
                />
              <Field
                label="description"
                type="text"
                name="description"
                validationError={formErrors.description}
                onChange={this.handleChange}
                />
              <Field             
                label="date"
                type="date"
                name="date"
                validationError={formErrors.date}
                onChange={this.handleChange}
                />
              <Field 
                label="initial time"
                type="time"
                name="initTime"
                validationError={formErrors.init}
                onChange={this.handleChange}
                />
              <Field
                label="end time"
                type="time"
                name="endTime"
                validationError={formErrors.end}
                onChange={this.handleChange}
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
            to="/chat"
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

      