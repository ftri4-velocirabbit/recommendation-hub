import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {

  render() {
    return(
      <div className="loginContainer">
        <form id="signUp_form">
          <label>First Name:</label><br></br>
          <input type="text" placeholder="Ex: John/Jane" name="firstName" /><br></br>
          <label>Last Name:</label><br></br>
          <input type="text" placeholder="Ex: Doe" name="lastName" /><br></br>
          <label>Username:</label><br></br>
          <input type="text" placeholder="Ex: NancysAppleFingers2021" name="username" /><br></br>
          <label>Password:</label><br></br>
          <input type="password" placeholder="Ex: Ftri4>Ftri3" name="password" />
        </form>
      </div>
    )
  }
}



export default SignUp;