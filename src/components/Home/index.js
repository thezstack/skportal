import React from 'react';
import  { FirebaseContext } from '../Firebase';
const Home = () => (
  <FirebaseContext.Consumer>
    {firebase => {

      var x = firebase.getInventory();

      return console.log(x);
    }}
  </FirebaseContext.Consumer>
);
export default Home;