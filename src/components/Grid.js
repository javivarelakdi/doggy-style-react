import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading"

export default class Grid extends Component {
  
  state={
    isLoading: true
  }
  
  componentDidMount(){
      this.setState({
        isLoading: false
      });
    }
  
  render() {
    const { currentUserId, columns, isFiltered, filteredUsers, isFav } = this.props;

    const users = isFiltered 
      ? filteredUsers
      : this.props.users ;
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
      <>
      {this.state.isLoading && <Loading/>}
      {!this.state.isLoading &&
      <ul className="flex-row">
        { users.length ?
          users.map((user, i) => {
            return (
              currentUserId === user._id ?
              null
              :
              <li className={`col-${colIndex} grid-element flex-row`} key={i} style={{backgroundImage: `url(${user.imgUrl})`}}>
                  <Link className="col-12 flex-row ai-end jc-end" to={user._id}>
                    <span className="bg-pink fs-small fc-white pl-small pr-small">
                    { isFav
                      ? user.username
                      : `${user.username}: ${(user.dist.calculated / 1000).toFixed(2)} km` }
                  </span>
                  </Link>
              </li>
            );
          })
          :
          <p className="pa-1">ouch! There are no dogs with your current filter, try again please</p>
        }     
      </ul>
      }
      </>
    );
  }
}


