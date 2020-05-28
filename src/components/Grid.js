import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Grid extends Component {
  
  state={
    users:[]
  }
  
  componentDidMount(){
    if (this.props.isFavView) {
      this.setState({
        users: this.props.users
      });
    } else {
      const includeDistance = async user => {
        const userPos = await this.getDistance(user.location.coordinates[0], user.location.coordinates[1])
        return {...user, distance: userPos};
      }
      const usersWithDistance = () => Promise.all(this.props.users.map(user => includeDistance(user)))
      usersWithDistance().then(result => {
        result.sort(this.compare);
        this.setState({
          users: result
        });
      })
    }
    
  }

  compare = (a, b) => {
    const userA = a.distance
    const userB = b.distance
   
    let comparison = 0;
    if (userA > userB) {
      comparison = 1;
    } else if (userA < userB) {
      comparison = -1;
    }
    return comparison;
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
  
  render() {
    const { columns, currentUserId, isFiltered, filteredUsers } = this.props;
    const users = isFiltered 
      ? filteredUsers
      : this.state.users ;
    let colIndex; 
    switch (true) {
      case (columns === 2):
        colIndex = "6";
        break;
      case (columns === 4):
        colIndex = "3";
        break;
      default:
        colIndex = "4";
        break;
    }
    return (
      <ul className="flex-row">
        { users.length ?
          users.map((user, i) => {
            return (
              <li className={`col-${colIndex} grid-element flex-row`} key={i} style={{backgroundImage: `url(${user.imgUrl})`}}>
                  <Link className="col-12 flex-row ai-end jc-end" to={user._id}>
                    <span className="bg-pink fs-small fc-white pl-small pr-small">
                    { (currentUserId && currentUserId === user._id) || !user.distance
                      ? user.username
                      : `${user.username}: ${user.distance.toFixed(2)} km away`}
                  </span>
                  </Link>
              </li>
            );
          })
          :
          <p class="pa-1">ouch! There are no dogs with your current filter, try again please</p>
        }     
      </ul>
    );
  }
}


