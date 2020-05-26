import React, { Component } from 'react';


export default class Field extends Component {


  render() {
    const { label, type, name, value, onChange, options, required, validationError } = this.props
    return (
      <li className="flex-row col-12 bb-white pb-1 pt-1">
        <label className="col-4">{label}</label>
        {type === "select" ?
        <select 
          required = {required}
          className="col-8 select" 
          name={name}
          value={value}
          onChange={e => onChange(e)}>
          {options.map((op, i) => {
            return <option key={i} value={op.value}>{op.text}</option> 
          })
          }
        </select>
        : 
        <div className="col-8 flex-row">
          <input 
            required = {required}
            type={type} 
            className={`col-12 ${validationError && "input-error"}`}
            value={value}
            name={name} 
            onChange={onChange}/>
          {validationError &&
          <p className="fc-pink fs-small fw-bold">{validationError}</p>
          }
        </div>
        }
      </li>
    );
  }
}
