import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    const { elements, isFooter } = this.props;
    return (
      <nav className={isFooter ? "navbar navbar--footer full-width" : "navbar full-width"}>
          <ul className="flex-row jc-between full-height">
            {elements.map((el, i) => {
              return (
                <li className="pl-1 pr-1 col-3 ta-center as-center" key={i}>
                  <a href={el.href}>
                    <i className={el.iconClass}></i>
                  </a>
                </li>
              );
            })}              
          </ul>
      </nav>
    );
  }
}
