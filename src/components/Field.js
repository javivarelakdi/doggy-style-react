import React, { Component, Fragment } from 'react';


export default class Field extends Component {


  render() {
    const { label, type, name, value, onChange } = this.props
    return (
      <Fragment>
      { type === "hidden" ?
        <input name={name} type="hidden" value={value}/>
      : 
        <li className="flex-row col-12 bb-white pb-1 pt-1">
          <label className="col-4">{label}</label>
          <input 
            type={type} 
            className="col-8" 
            name={name} 
            onChange={onChange}/>
        </li>
      }
      </Fragment>
    );
  }
}
