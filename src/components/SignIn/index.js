import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div className="sign-in-container">
    <div>
      <h1 className="welcome-text">Welcome to School Kits Portal</h1>
      <SignUpLink />
      <SignInForm />
      <PasswordForgetLink />
    </div>
    <style jsx>{`
      .sign-up-text {
        font-family: "Quicksand", sans-serif;
        text-decoration: underline;
      }

      .sign-in-container {
        display: flex;
        justify-content: center;
      }

      .welcome-text {
        font-family: "Quicksand", sans-serif;
        font-weight: 500;
      }
    `}</style>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="form-background">
        <form className="form-container" onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button  className="sign-in-out-button" disabled={isInvalid} type="submit">
           Login
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <style jsx>
        {
          `
          .form-container{
            display:flex;
            flex-flow:column;

          }
          .form-background{
      
            width: 100%;
            padding: 30px;
            background: white;
            box-sizing: border-box;
            border:1px solid black;
          }
          .form-container > input{
            margin-bottom:30px;
            padding:15px;
            border: 1px solid black;
            font-size: 14px;
            background:white;
            font-family:'Quicksand', sans-serif;
          }
          .sign-in-out-button{
            background-color:#936142;
            padding:10px;
            font-size:16px;
            font-family:'Quicksand', sans-serif;
            color:white;
            font-weight:bold;
            border:1px solid black;
            cursor:pointer;
            margin-top:50px;
          }

          

          `
        }
        </style>
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
