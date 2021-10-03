import React, { Component } from 'react';
import  { Link } from 'react-router-dom';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    if (event.target.name === "userNameLogin") {this.setState({userNameLogin: inputValue });}
    if (event.target.name === "passwordLogin") {this.setState({passwordLogin: inputValue });}
  }


  handleOnSubmit = (event) => {
    console.log("State Upon Login Button: ", this.state);
    console.log("🚀 ~ file: login.jsx ~ line 32 ~ Login ~ event", event)
    const body = { event } // todo this is off

    console.log({user: this.state.userNameLogin, pass: this.state.passwordLogin})
    event.preventDefault(); // TODO remove this so it redirects

    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state) //! Data will have to be parsed into the usernamLogin and passwordLogin in the BACKEND
    })
    .then(resp => resp.json())
    .then(() => {
      // Once userNameLogin and passwordLogin are verified and we receive the response, we will redirect to the results page
      return <Redirect to="/results" />
    })
    .catch(err => {
      // A userNameLogin & passwordLogin mismatch or missing UserNameLogin will result in an alert and more opportunitites to try agian.
      return alert('Incorrect username or password.')
    });
  };

  onLinkClick(e) {
    e.preventDefault();
    // further processing happens here
  }

  //TODO: Add onchange events to change the state as letters are entered.
  //TODO: Need to pass down state
  // Statement to render
  render() {

    console.log({state: this.state});

    return (
      <div className="formContainer">
        <form id="login_form" onSubmit={this.handleOnSubmit}>
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
          <button type="submit" id="login_Button">Log in</button>
          <h3> Not signed up? </h3><br></br>
          {/* Button uses React Router to go to the Sign-Up Page */}

          <Link to={'/signup'}>
            <button type="button" id="signUpButton">Sign up</button>
          </Link>
        </form>
        <Link to={'/addmovie'}>
          <button type="button" id="addMovieTemp">Temp Route To Add Movie</button>
        </Link>
      </div>
    )
  }
}




export default Login;