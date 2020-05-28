import React, { Component } from "react";


export default class Navbar extends Component {

  render() {
    const { children, isFooter, isChat } = this.props;
    return (
      <nav className={isFooter ? "navbar navbar--footer full-width" : "navbar full-width"}>
          {isChat ?
          children
          :
          <ul className="flex-row jc-between full-height">
            {children.map((child, i) => {
              return (
                <li key={i}
                  className={` pl-1 pr-1 col-3 ta-center as-center fc-pink ${child.props.parentclass ? child.props.parentclass : ""}`}>
                  {child}
                </li>
              );
            })}              
          </ul>
          }
      </nav>
    );
  }
}
