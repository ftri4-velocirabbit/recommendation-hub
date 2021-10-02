import React, { Component } from 'react';
import  { Link } from 'react-router-dom';


class Login extends React.Component {
  // Statement to render
  render(){
    return (
      <div className="loginContainer">
        <form id="login_form">
          <label>Username:</label><br></br>
          <input type="text" className="userName" value=""></input><br></br>
          <label>Password:</label><br></br>
          <input type="password" className="passWord" value=""></input><br></br>
          <h3> Not signed up? </h3><br></br>
          <button id="signUpButton">Sign up</button>
        </form>
      </div>
    )
  }
}




export default Login;