import React, { Component } from "react";
import IconButton from "../components/IconButton"

export default class Popup extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
        <div className='flex-row jc-end'>
          <IconButton
            buttonClass="ma-small"
            iconClass="fas fa-times fc-white"
            onClick={this.props.closePopup}
          />
        </div>
        {this.props.children}
        </div>
      </div>
    );
  }
}
