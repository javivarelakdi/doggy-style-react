import React, { Component } from "react";

export default class Section extends Component {
  render() {
    const { columns, data } = this.props;
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
        {data.map((el, i) => {
          return (
            <li className={`col-${colIndex} grid-element flex-row`} key={i} style={{backgroundImage: `url(${el.img})`}}>
                <a className="col-12 flex-row ai-end jc-end" href="">
                  <span className="bg-pink fs-small fc-white pl-small pr-small">{el.name}</span>
                </a>
            </li>
          );
        })}     
      </ul>
    );
  }
}


