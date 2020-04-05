import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import { withEmailVerification } from "../Session";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      inventory: [],
      isNewUser: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.inventory().on("value", (snapshot) => {
      const inventoryObject = snapshot.val();
      this.setState({
        inventory: inventoryObject,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.inventory().off();
  }

  render() {
    const { inventory, loading } = this.state;
    console.log(this.props.authUser);
    if (this.props.authUser.isNewUser === false) {
      return (
        <div>
          <h1>Home</h1>
          {loading && <div>Loading ...</div>}
          <ReactTable data={inventory} columns={columns} filterable />
        </div>
      );
    } else {
      return (
        <div className="container-welcome">
          <div >
            <h1>Welcome {this.props.authUser.username}</h1>
            <p>
              This portal will help you create the school list for your
              classroom. Please click the button below to begin.
            </p>
            <button className="start-button">Start</button>
          </div>
          <style jsx>
            {`

              .container-welcome{
                display:flex;
                justify-content:center;
               margin-top:100px;
              }
              .start-button {
                background-color: #48b8d0;
                padding: 10px;
                font-family: "Quicksand", sans-serif;
                font-weight: bold;
                color: white;
                font-size: 16px;
                width: 300px;
                cursor: pointer;
                margin-top:50px;
              }
            `}
          </style>
        </div>
      );
    }
  }
}
const columns = [
  {
    id: (d) => d[5],
    Header: "Product Description",
    accessor: (d) => d[0],
    filterAll: false,
  },
  {
    id: "Price",
    Header: "Price",
    accessor: (a) => "$" + a[7],
    filterable: false,
  },
  {
    id: "Image",
    Header: "Product Image",
    accessor: (b) => <img width="100" src={b[8]} alt="yo" />,
    filterable: false,
  },
  {
    id: "Add",
    Header: "Add to list",
    filterable: false,
    Cell: (cellInfo) => (
      <Link
        to={{
          pathname: "/product-detail",
          state: { description: cellInfo.original },
        }}
      >
        <button>Add</button>
      </Link>
    ),
  },
];

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default compose(
  withFirebase,
  withEmailVerification,
  connect(mapStateToProps)
)(Home);
