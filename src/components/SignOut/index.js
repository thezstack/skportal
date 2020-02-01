import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {withFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes';


class SignOut extends Component {

    onClick = event =>{
        this.props.firebase.doSignOut();
        this.props.history.push(ROUTES.LANDING);
    }

render(){
    return(
        <button type="button" onClick={this.onClick}> Sign Out </button>
    )
}
}

export default withRouter(withFirebase (SignOut));