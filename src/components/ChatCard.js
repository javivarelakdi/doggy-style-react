import React, { Component } from "react";


export default class ChatCard extends Component {
  render() {
    const { title, time, imgUrl, content, onClick } = this.props;
   
    return (
      <li className="flex-row col-12 pb-1 mb-1 bb-dark" onClick={onClick}>
        <div 
          className="col-3 grid-element grid-element--small" 
          style={{backgroundImage: `url(${imgUrl})`}}>
        </div>
        <div className="col-9 flex-row pl-1">
          <div className="col-10 ellipsis fc-dark">{title}</div>
          <div className="col-2 fs-small fc-dark">{time}</div>
          <div className="col-12 fs-small ellipsis fc-dark">{content}</div>
        </div>
      </li>
    );
  }
}


