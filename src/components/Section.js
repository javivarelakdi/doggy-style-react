import React, { Component } from "react";

export default class Section extends Component {
  render() {
    const { children, hasNav, hasTabs } = this.props;
    const sectionClassName = hasNav && hasTabs
      ? "section section--with-navbar section--with-tabs"
      : hasNav 
        ?  "section section--with-navbar"
        :  "section";
    return (
      <section className={sectionClassName}>
        <div className="section__content">
          {children}
        </div>
      </section>
    );
  }
}
