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
import Popup from "../components/Popup"


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
    lat:"",
    showPopup: false, 
  };

  componentDidMount() {
    apiClient
      .getEvent(this.props.match.params.id)
      .then(async (event) => {
        const attending = event.data.attendees.filter((att) => {
          return att._id === this.props.currentUser._id
        })
        const distance = await this.getDistance(event.data.location.coordinates[0], event.data.location.coordinates[1])
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
          lat: event.data.location.coordinates[1],
          distance: distance
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

  getDistance = (lng, lat) => {
    return new Promise(resolve => {
      const toRad = (degrees) => {
        return degrees * (Math.PI/180);
      }
      
      const distance = (lon1, lat1, lon2, lat2) => {
          const R = 6371; // Radius of the earth in km
          const dLat = toRad(lat2-lat1);  // Javascript functions in radians
          const  dLon = toRad(lon2-lon1); 
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2); 
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          const d = R * c; // Distance in km
          return d;
        }
        
        window.navigator.geolocation.getCurrentPosition(function(pos) {
          resolve(distance(pos.coords.longitude, pos.coords.latitude, lng, lat))
        });
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

  handleDelete= (e) => {
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

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  

  render() {
    const { event, isLoading, editing, name, description, date, initTime, endTime, errorStatus, lng, lat, distance } = this.state;
      
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
              iconClass="fas fa-chevron-left ba-white bg-pink fc-white pa-small"
              onClick={this.props.history.goBack}
            />
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
                <h2 className="ellipsis col-12 pb-small fc-dark">{name}</h2>
                
                <div className="pr-1">
                  <i className="pr-small fs-small fas far fa-calendar fc-pink"></i> 
                  <span className="fs-small fc-dark">{date.substring(0,10)}</span>
                </div>
                <div className="pr-1">
                  <i className="pr-small fs-small fas fa-clock fc-pink"></i> 
                  <span className="fs-small fc-dark">{`${initTime} - ${endTime}`}</span>
                </div>
                <div>
                  <i className="pr-small fs-small fas fa-map-marker-alt fc-pink"></i>
                  <span className="fs-small pr-small fc-dark">{distance}km away</span>
                </div>
              </div>
              { event.owner._id !== this.props.currentUser._id ?
                <div className="col-4 pa-1 ta-right fc-white">
                  <select 
                    className="col-12 select select--button fc-white ba-white" 
                    name="isAttending"
                    value={this.state.isAttending}
                    onChange={this.handleToggleAttendee}>
                    <option value="true">✔</option> 
                    <option value="false">✘</option>
                  </select>
                </div>
                :
                <ul className="col-4 pa-1 flex-row">
                    <li className="col-6 ta-center as-center">
                    <IconButton
                      iconClass="fas fa-edit"
                      onClick= {this.changeScreen}/>
                    </li>
                    <li className="col-6 ta-center as-center">
                      <IconButton
                        iconClass="far fa-trash-alt"
                        onClick= {this.togglePopup}
                      />
                    </li>
                </ul>
              }
            </div>
            <p className="pr-1 pl-1 fc-dark">{description}</p>
            <p className="pr-1 pl-1 pt-1 fc-dark">Attendees:</p>
            <ul className="flex-row pa-1">
              {event.attendees.map((attendee, i) => {
                return <li 
                  className="col-2 grid-element grid-element--small flex-row" 
                  style={{backgroundImage: `url(${attendee.imgUrl})`}}
                  key={i}>
                  <Link className="col-12 flex-row ai-end jc-end" to={`/${attendee._id}`}></Link>
                </li>
              })}
            </ul>
          </div>
          {this.state.showPopup &&
            <Popup closePopup={this.togglePopup} small>
              <div className="pa-1 flex-row">
                <h2 className="ta-center">Are you sure you want to cancel this event?</h2>
                <button 
                  className="button col-12 mt-1"
                  onClick= {this.handleDelete}>
                  Delete
                </button>
              </div>
            </Popup>
          }
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
          </>
          }
        </Section>
        }
      </div>
    );
  }
}


