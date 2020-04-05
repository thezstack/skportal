import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { connect } from "react-redux";
import { withFirebase } from "../Firebase";


import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = ({authUser}) => (

  <Router >
    <div className={authUser ? "app-container": "blue app-container" } >
      <Navigation />


      <Route exact path={ROUTES.LANDING} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />

      <style jsx>
        {`
        .blue{
          background-color: #CCFBFE;
        }
        .app-container{
          height:100%;
        }
        
        `}
      </style>
    </div>

  </Router>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});


export default withAuthentication(connect(mapStateToProps)(App));