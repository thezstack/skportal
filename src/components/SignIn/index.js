import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div>
    <div className="container">
    <h1>Welcome to School Kits Portal</h1>
    <SignUpLink />
    <SignInForm />
 

    </div>


    <style jsx>
      {`
        .container {
          background-color: #ccfbfe;
          display:flex;
          justify-content:center;
          flex-direction:column;
        
        }
      `}
    </style>
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
    const isInvalid = password === " " || email === "";

    return (
      <div>
        <div >
          <form onSubmit={this.onSubmit}>
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
            <button disabled={isInvalid} type="submit">
              Sign In
            </button>
            {error && <p>{error.message}</p>}
          </form>
        </div>
        <style jsx>
          {`
            form{
              background-color: white;
              display:flex;
              flex-direction:column;
              justify-content:center;
            
              align-content:center;
            }

          `}
        </style>
      </div>
    );
  }
}
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export { SignInForm };
