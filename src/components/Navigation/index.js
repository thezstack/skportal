import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../media/2020-sk-logo.svg";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = ({ authUser }) =>
  authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />;

const NavigationAuth = ({ authUser }) => (
  <div>
    <div className="nav-container">
      <div className="logo-container">
        <Link to={ROUTES.HOME} className="logo-link">
          <img src={logo} alt="School Kits Logo" width="50px" />
          <h1>School Kits Portal</h1>
        </Link>
      </div>

      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
    <style jsx>
      {`
        a {
          color: black;
          font-family: "Quicksand", sans-serif;
          text-decoration: none;
        }
        .logo-link {
          color: black !important;
          text-decoration: none !important;
        }
        img {
        }
        ul {
          display: flex;
          list-style: none;
          justify-content: center;
          margin-top: 40px;
        }

        li {
          margin-left: 10px;
        }
        .logo-container > .logo-link {
          display: flex;
          align-items: baseline;
          margin-top: 10px;
        }
        h1 {
          font-family: "Quicksand", sans-serif;
          font-size: 24px;
          margin-left: 10px;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          margin: 0px 30px;
        }
      `}
    </style>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <div className="nav-container">
      <div className="logo-container">
        <Link to={ROUTES.LANDING} className="logo-link">
          <img src={logo} alt="School Kits Logo" width="50px" />
          <h1>School Kits Portal</h1>
        </Link>
      </div>
    </div>
    <style jsx>
      {`
        a {
          color: black;
          font-family: "Quicksand", sans-serif;
          text-decoration: none;
        }
        .logo-link {
          color: black !important;
          text-decoration: none !important;
        }
        img {
        }
        ul {
          display: flex;
          list-style: none;
          justify-content: center;
          margin-top: 40px;
        }

        li {
          margin-left: 10px;
        }
        .logo-container > .logo-link {
          display: flex;
          align-items: baseline;
          margin-top: 10px;
        }
        h1 {
          font-family: "Quicksand", sans-serif;
          font-size: 24px;
          margin-left: 10px;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          margin: 0px 30px;
        }
      `}
    </style>
  </div>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);
