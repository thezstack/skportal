import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: [],
    };
  }
  componentWillMount() {
    const user = this.props.authUser.listSetup;
    const loopedGrade = [];
    for (let counter = 0; counter < user.length; counter++) {
      loopedGrade.push(user[counter].grade);
    }

    this.setState({
      grade: loopedGrade,
    });
  }

  onClickCheckbox = (event) => {
    const user = this.props.authUser.listSetup;

    for (let counter = 0; counter < user.length; counter++) {
      if (user[counter].grade === event.target.name) {
        user[counter].inChargeOf = event.target.checked;
      } else {
      }
    }
  };

  onSubmit = event =>{
    console.log(this.props.authUser.uid);
    this.props.firebase.user(this.props.authUser.uid).update({

      listSetup : this.props.authUser.listSetup,
      isNewUser: false
    }).then(authUser => {
      this.props.history.push(ROUTES.HOME);
    }).catch(error =>{
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <div className="checkbox-container">
          {this.state.grade.map((grade) => (
            <label className="label-checkbox">
              {grade}
              <input
                name={grade}
                checked={this.props.authUser.inChargeOf}
                type="checkbox"
                onChange={this.onClickCheckbox}
     
              />
            </label>
          ))}
        </div>
        <button onClick={this.onSubmit}>Save</button>

          <style jsx>{`
          

   
          .checkbox-container{
            display:flex;
            flex-direction:column;

          }

          .label-checkbox{
            font-family:'Quicksand', sans-serif;
            font-size:16px;
        
            width:300px;
            padding:10px;
            margin-top:10px;
          }
          `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const enhance =compose(withFirebase, connect(mapStateToProps) )

export default enhance(Onboarding) ;
