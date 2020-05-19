import React, { Component, Fragment } from 'react';


export default class Field extends Component {


  render() {
    const { label, type, name, value, onChange, options } = this.props
    return (
      <Fragment>
      { type === "hidden" ?
        <input name={name} type="hidden" value={value}/>
      : 
        <li className="flex-row col-12 bb-white pb-1 pt-1">
          <label className="col-4">{label}</label>
          {type === "select" ?
          <select 
            className="col-8 select" 
            name={name}
            value={value}
            onChange={onChange}>
            {options.map((op, i) => {
              return <option key={i} value={op.value}>{op.text}</option> 
            })
            }
          </select>
          : 
          <input 
            type={type} 
            className="col-8" 
            value={value}
            name={name} 
            onChange={onChange}/>
          }
        </li>
      }
      </Fragment>
    );
  }
}
