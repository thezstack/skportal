import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      inventory: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.inventory().on("value", snapshot => {
      const inventoryObject = snapshot.val();
      this.setState({
        inventory: inventoryObject,
        loading: false
      });
    });


  }

  componentWillUnmount() {
    this.props.firebase.inventory().off();
  }

  render() {
   
    const { inventory, loading } = this.state;
    return (
      <div>
        <h1>Home</h1>
        {loading && <div>Loading ...</div>}
        <ReactTable data={inventory} columns={columns} filterable />
      </div>
    );
  }
}
const columns = [
  {
    id: d => d[5],
    Header: "Product Description",
    accessor: d => d[0],
    filterAll: false
  },
  {
    id: "Price",
    Header: "Price",
    accessor: a => "$" + a[7],
    filterable: false
  },
  {
    id: "Image",
    Header: "Product Image",
    accessor: b => <img width="100" src={b[8]} alt="yo" />,
    filterable: false
  },
  {
    id: "Add",
    Header: "Add to list",
    filterable: false,
    Cell: cellInfo => (
      <Link
        to={{
          pathname: "/product-detail",
          state: { description: cellInfo.original }
        }}
      >
        <button>Add</button>
      </Link>
    )
  }
];


export default compose(
  withFirebase,
  withEmailVerification
)(Home);
