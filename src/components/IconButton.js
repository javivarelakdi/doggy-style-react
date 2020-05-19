import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";


export default class IconButton extends Component {

  render() {
    const {iconClass, to, onClick, buttonClass} = this.props;
    return (
      <Fragment>
      {to ?
        <Link to={to}>
          <button className={`icon-button ${buttonClass}`}>
            <i className={iconClass}></i>
          </button>
        </Link>
        :
        <button 
          className={`icon-button ${buttonClass}`} 
          onClick={onClick}>
          <i className={iconClass} ></i>
        </button>
      }
      </Fragment>
    );
  }
}
