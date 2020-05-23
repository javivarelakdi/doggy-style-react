import React, { Component } from "react";


export default class Error extends Component {
  
  render() {
    const { status } = this.props;
    return (
      <div className="App bg-blue flex-row jc-center ai-center">
        <div>
          <img className="col-12 error-box" src={`/images/dog-status/${status}.jpg`} alt={`error ${status}`}/>
        </div>
      </div>
    );
  }
}
