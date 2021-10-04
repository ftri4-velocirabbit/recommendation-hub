import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {

  // Send post to backend and save new user info to DB
  // Redirect to login page
  handleSubmitNewUser() {}




  render() {
    return(
      <div className="formContainer">
        <form id="signUp_form" onsubmit="handleSubmitNewUser">
          <label>First Name:</label><br></br>
          <input type="text"
                placeholder="Ex: John/Jane"
                name="firstName" /><br></br>
          <label>Last Name:</label><br></br>
          <input type="text"
                placeholder="Ex: Doe"
                name="lastName" /><br></br>
          <label>Username:</label><br></br>
          <input type="text"
                placeholder="Ex: NancysAppleFingers2021"
                name="username" /><br></br>
          <label>Password:</label><br></br>
          <input type="password"
                placeholder="Ex: Ftri4>Ftri3"
                name="password" />
          <button type="button" id="signUp_button">Submit sign up</button>
        </form>
      </div>
    )
  }
}



export default SignUp;