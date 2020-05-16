import React, { Component } from "react";


export default class Navbar extends Component {

  render() {
    const { children, isFooter } = this.props;
    return (
      <nav className={isFooter ? "navbar navbar--footer full-width" : "navbar full-width"}>
          <ul className="flex-row jc-between full-height">
            {children.map((child, i) => {
              return (
                <li className="pl-1 pr-1 col-3 ta-center as-center fc-pink" key={i}>
                  {child}
                </li>
              );
            })}              
          </ul>
      </nav>
    );
  }
}
