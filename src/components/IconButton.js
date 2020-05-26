import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class IconButton extends Component {

  render() {
    const {iconClass, to, onClick, buttonClass} = this.props;
    return (
      <>
      {to ?
        <Link to={to}>
          <button className={buttonClass !== undefined ? `icon-button ${buttonClass}` : "icon-button"}>
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
      </>
    );
  }
}
