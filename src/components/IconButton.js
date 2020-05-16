import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";


export default class IconButton extends Component {

  render() {
    const {iconClass, to, onClick} = this.props;
    return (
      <Fragment>
      {to ?
        <Link to={to}>
          <button className="icon-button">
            <i className={iconClass}></i>
          </button>
        </Link>
        :
        <button className="icon-button" onClick={onClick}>
          <i className={iconClass} ></i>
        </button>
      }
      </Fragment>
    );
  }
}
