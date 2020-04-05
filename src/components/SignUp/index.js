import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const SignUpPage = () => (
  <div className="user-session-container">
    <div className="user-session-custom-width">
      <h2>Register Below</h2>
      <SignUpForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  schoolName: "Select Your School",
  numberOfStudents: "",
  isAdmin: false,
  error: null,
  schoolNameError: null,
  isNewUser:true,
  listSetup:{
    0: { items: [], numberofStudents: 0, inChargeOf: false , grade:"Kindergarten"},
    1: { items: [], numberofStudents: 0, inChargeOf: false , grade:"First Grade"},
    2: { items: [], numberofStudents: 0, inChargeOf: false , grade:"Second Grade"},
    3: { items: [], numberofStudents: 0, inChargeOf: false ,grade:"Third Grade"},
    4: { items: [], numberofStudents: 0, inChargeOf: false , grade:"Fourth Grade"},
    5: { items: [], numberofStudents: 0, inChargeOf: false , grade:"Fifth Grade"},
  }
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin, schoolName, isNewUser, listSetup} = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }
    if (schoolName !== "Select Your School") {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          return this.props.firebase.user(authUser.user.uid).set({
            username,
            email,
            roles,
            schoolName,
            isNewUser,
            listSetup
          });
        })
        .then(() => {
          return this.props.firebase.doSendEmailVerification();
        })
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
          }

          this.setState({ error });
        });

      event.preventDefault();
    } else {
      event.preventDefault();
      const schoolNameError ="Please select your school";
      this.setState({ schoolNameError });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
      schoolName,
      schoolNameError
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <div className="user-session-form-background">
        <form className="user-session-form-container" onSubmit={this.onSubmit}>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <select
            className="user-session-dropdown"
            name="schoolName"
            value={schoolName}
            onChange={this.onChange}
            type="text"
            placeholder="Select Your School"
          >
            <option value="Select Your School">Select Your School</option>
            <option value="Iman Academy South East">
              Iman Academy South East
            </option>
            <option value="Iman Academy South West">
              Iman Academy South West
            </option>
            <option value="Houston Quran Academy">Houston Quran Academy</option>
            <option value="Ilm Academy">Ilm Academy</option>
          </select>
          <label>
            Admin:
            <input
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={this.onChangeCheckbox}
            />
          </label>
          <button
            className="user-session-button"
            disabled={isInvalid}
            type="submit"
          >
            Sign Up
          </button>
         
         <p>{schoolNameError}</p>
          {error && <p>{error.message}</p>}
        </form>{" "}
      </div>
    );
  }
}

const SignUpLink = () => (
  <p className="sign-up-text">
    <Link to={ROUTES.SIGN_UP}> Don't have an account? Sign up here.</Link>
  </p>
);
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };
