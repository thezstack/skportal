import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  
  <div>
    <div>

    
    <div className="container">
    <h1>Welcome to School Kits Portal</h1>
   
    <SignUpLink />
    
    <div id="form-box">
        
    </div>
    

    </div>
    <p>Login</p>
    </div>
    <div className="container2">
      <SignInForm />
      
    </div>

    <style jsx>
      {`
        .container2{
          
           
          
                             
          
          
        }
        
        .container {
          background-color: #ccfbfe;
          display:flex;
          /*justify-content:center;*/
          flex-direction: column;
          align-items: center;
          
          
        
        }
        
        p{
            margin:0;
            font-family: 'Quicksand', sans-serif;
            background-color: #ccfbfe
            
            
        }
        h1{
          font-family: 'Quicksand', sans-serif;
          font-size: 23px;
        }
      `}
    </style>
  </div>
  
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === " " || email === "";

    return (
      <div className="container">
        <div className="two">
          <form onSubmit={this.onSubmit}>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <button className="signIn-button" disabled={isInvalid} type="submit">
              Sign In
            </button>
            {error && <p>{error.message}</p>}
          </form>
        </div>
        <style jsx>
          {`
            .container{
              display:flex;
              border 1px solid black;
              flex-direction: column;                    
              
              
            }
            input{
             

              display: flex;
              flex-dirction: column;
              

            }
            .signIn-button{
              margin: 0 auto;
              
              display: block;
              border: none;
              background-color: #916342
              cursor: pointer;
              color: black;
              border:0.1em solid #000000;
              padding: 10px 126px;


              -webkit-transition-duration: 0.2s; 
              transition-duration: 0.2s;
              
             
            }
            .signIn-button:hover{
              /*box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);*/
              border-color: #FFFFFF;
              color: #FFFFFF;

            }
            input[type=text] {
              width: 300px;
              border: 1px solid #ccc;
              margin: 8px 0;
              outline: none;
              padding: 10px;
              box-sizing: border-box;
              /*padding: 12px 60px;
              margin: 20px 0;
              display: inline-block;
              border: 1px solid #ccc;
              border-radius: 2px;
              box-sizing: border-box;*/
              margin-bottom: 40px;       /*probably going to remove once border is made*/
              
            }
            
            input[type=text]:focus{
              border-color: #349bff;
              box-shadow: 0 0 8px 0 #349bff;
            }
            input[type=password] {
              width: 300px;
              border: 1px solid #ccc;
              margin: 8px 0;
              outline: none;
              padding: 10px;
              box-sizing: border-box;
              /*padding: 12px 60px;
              margin: 20px 0;
              display: inline-block;
              border: 1px solid #ccc;
              border-radius: 2px;
              box-sizing: border-box;*/
              
            }
            input[type=password]:focus{
              border-color: #349bff;
              box-shadow: 0 0 8px 0 #349bff;
            }


            /*.two{
              background: white;
              border: 1px solid #f2f2f2;
              
              
               
            }*/

          `}
        </style>
      </div>
    );
  }
}
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export { SignInForm };
