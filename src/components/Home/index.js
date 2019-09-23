import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      inventory: [],
      childData: []
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
    const { inventory, loading, childData } = this.state;

    return (
      <div>
        <h1>Home</h1>
        {loading && <div>Loading ...</div>}
       <InventoryList inventory={inventory}/>
      </div>
    );
  }
}

const InventoryList = ({ inventory }) => (
  <ul>
    {inventory.map(user => (
      <li key={user[5]}>
        <span>
          <strong>Product:</strong> {user[0]}
        </span>
        <span>
          <strong>Image: </strong><img  width= '100' src={user[8]} alt="product"/>
        </span>
      </li>
    ))}
  </ul>
);








export default withFirebase(Home);
