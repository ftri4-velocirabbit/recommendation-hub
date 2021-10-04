import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userNameLogin: '',
      passwordLogin: ''
    }
      // Update state for each letter passed into the username and pw input boxes
  this.handleOnChange = this.handleOnChange.bind(this);
  this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange = (event) => { //?How can we get the input name so this function can be used for password too?
    // Pass in the data we need to send to state
    const name = event.target.name;
    const inputValue = event.target.value;

    if (event.target.name === "firstName") {this.setState({firstName: inputValue });}
    if (event.target.name === "lastName") {this.setState({lastName: inputValue });}
    if (event.target.name === "userNameLogin") {this.setState({userNameLogin: inputValue });}
    if (event.target.name === "passwordLogin") {this.setState({passwordLogin: inputValue });}

    console.log('State on Change = ', this.state)
  }


  handleOnSubmit = (event) => {
    console.log("State Upon Login Button: ", this.state);

    const body = { event }

    console.log({user: this.state.userNameLogin, pass: this.state.passwordLogin, firstName: this.state.firstName, lastName: this.state.lastName})

    // TODO remove this so it redirects

    fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state) // todo fix here What do we send back and how do we send it back
    })
    .then(resp => resp.json())
    // .then(() => {
    //   // Once account is created, bring the user back to the login page
    // })
    .catch(err => {
      // Return a general error if POST did not work
      return <Redirect to={'/'} />
      // return alert('ERROR: Was not able to create an account')
    });
  };

  //TODO: Add onchange events to change the state as letters are entered.
  //TODO: Need to pass down state
  // Statement to render
  render() {

    console.log({state: this.state});

    return (
      <div className="formContainer">
        <form id="signup_form" onSubmit={this.handleOnSubmit}>
        <label>First Name:</label><br></br>
          <input type="firstname"
                className="firstName"
                placeholder="John/Jane"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleOnChange}>
          </input><br></br>
          <label>Last Name:</label><br></br>
          <input type="lastname"
                className="lastName"
                placeholder="Doe"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleOnChange}>
          </input><br></br>
          <label>Username:</label><br></br>
          <input type="text"
                className="userName"
                placeholder="Ex: NancysAppleFingers2021"
                name="userNameLogin"
                value={this.state.userNameLogin}
                onChange={this.handleOnChange}>
          </input><br></br>
          <label>Password:</label><br></br>
          <input type="password"
                className="passWord"
                placeholder="Ex: Ftri4>Ftri3"
                name="passwordLogin"
                value={this.state.passwordLogin}
                onChange={this.handleOnChange}>
          </input><br></br>

          {/* Link back to login once user has created an account */}
          <button type="submit" id="signup_button">Sign Up!</button>

        </form>
        {/* /login is not valid! the core page is /  */}
        <Link to={'/'}>
          <button type="button" id="loginTempBtn">Temp Route To Login Page</button>
        </Link>
      </div>
    )
  }
}



//   // Send post to backend and save new user info to DB
//   // Redirect to login page
//   handleSubmitNewUser() {}



export default SignUp;