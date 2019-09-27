import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

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

    let selectedPerson= [];
for (let person of inventory) {
  console.log();
  let counter= 0;
  selectedPerson.push(person[0]);
  selectedPerson.push(person[5]);
  counter++;
  
}


console.log(selectedPerson);



    return (
      <div>
        <h1>Home</h1>
        {loading && <div>Loading ...</div>}
        <ReactTable
  data={inventory}
  columns={columns}
  filterable
/> 
      </div>
    );
  }
}
const columns = [ {
  id:d => d[5],
  Header: 'Product Description',
  accessor: d => d[0],
  filterAll: false

},
{
  id:'Price',
  Header:'Price',
  accessor: a => '$'+ a[7],
  filterable:false
},
{
  id:'Image',
  Header:'Product Image',
  accessor:b => <img width = '100' src={b[8]} alt='yo' />,
  filterable:false
}

]


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
