import React, {Component} from 'react';
import  { FirebaseContext } from '../Firebase';

class Home extends Component {


render(){

  return (
  
<FirebaseContext.Consumer>
    {firebase => {

      var inventory = firebase.getInventory()
      console.log(inventory);
        }}

 </FirebaseContext.Consumer>

  );
}

  }
    

export default Home;