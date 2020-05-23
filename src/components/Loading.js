import React, { Component } from "react";


export default class Loading extends Component {

  render() {
    return (
      <div className="App bg-blue flex-row jc-center ai-center">
        <div>
          <img className="col-12" src="/images/480.gif" alt="loading"/>
          <p>loading.......</p>
        </div>
      </div>
    );
  }
}
