import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class SignOut extends Component {
  onClick = event => {
    this.props.firebase.doSignOut();
    this.props.history.push(ROUTES.LANDING);
  };

  render() {
    return (
      <div>
        <button className="signout-button "type="button" onClick={this.onClick}>
        
          Sign Out
        </button>

        <style jsx>
          {`
            .signout-button {
                padding:10px 5px;
                background-color:#B28B84;
                border:1px solid black;
                font-family:'Quicksand', sans-serif;
                font-size:14px;
                margin-top:-10px;
                font-weight:bold;
            }
          `}
        </style>
      </div>
    );
  }
}

export default withRouter(withFirebase(SignOut));
