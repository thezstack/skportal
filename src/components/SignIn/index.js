import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div className="user-session-container ">
    <div>
      <h1 className="welcome-text">Welcome to School Kits Portal</h1>
      <SignUpLink />
      <h2 className="login-h2">Login</h2>
      <SignInForm />
      <PasswordForgetLink />
    </div>
    <style jsx>{`
      .sign-up-text {
        font-family: "Quicksand", sans-serif;
        text-decoration: underline;
      }

      .welcome-text {
        font-family: "Quicksand", sans-serif;
        font-weight: 500;
      }
      .forgot-password-text{
        color:#936142;
        font-weight:bold;
        cursor:pointer;
        text-decoration:underline;
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
      <div className="user-session-form-background">
        <form className="user-session-form-container" onSubmit={this.onSubmit}>
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
          <button  className="user-session-button" disabled={isInvalid} type="submit">
           Login
          </button>

          {error && <p>{error.message}</p>}
        </form>

      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
