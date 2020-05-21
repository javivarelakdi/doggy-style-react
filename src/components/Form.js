import React, { Component } from 'react';


export default class Form extends Component {


  render() {
    const { onSubmit, children, submitButtonText} = this.props
    return (
      <form onSubmit={onSubmit}>
        {children && 
          <ul className="pa-1 flex-row">
            {children.map((field) => {
              return field;
            })}
          </ul>
        }
        <div className="flex-row pr-1 pl-1 pb-1">
          <button 
            className="button col-12" 
            type="submit">
            {submitButtonText ? submitButtonText : "Save"}
          </button>
        </div>
      </form>
    );
  }
}
