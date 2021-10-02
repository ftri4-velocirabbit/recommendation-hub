import React, { Component } from 'react';
import  { Link } from 'react-router-dom';


class Login extends React.Component {
  // Statement to render
  render(
    return (
      <div className="loginContainer">
        <label>Username:</label>
        <input type="text" className="userName" value=""></input>
        <label>Password:</label>
        <input type="password" className="passWord" value=""></input>
        <h3> Not signed up? </h3>
        <button id="signUpButton">Sign up</button>
      </div>
    )
  )
}




export default Login;