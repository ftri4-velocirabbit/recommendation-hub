import React, { Component } from 'react';
import  { Link } from 'react-router-dom';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Update state for each letter passed into the username and pw input boxes
      userNameLogin: ''
      passwordLogin: ''
    }
  }

  handleOnChange = (event, name) => { //?How can we get the input name so this function can be used for password too?
    // Pass in the data we need to send
    const body = { event };



      this.setState({
        userNameLogin: resp.params.userNameLogin,
        passwordLogin: resp.params.passwordLogin
      });
    }


  handleOnSubmit = (event) => {
    const body = { event }

    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(() => {
      // Once userNameLogin and passwordLogin are verified we will redirect to the results page
      return <Redirect to="/results" />
    })
    .catch(err => {
      // A userNameLogin & passwordLogin mismatch or missing UserNameLogin will result in an alert and more opportunitites to try agian.
      return alert('Incorrect username or password.')
    });
  };

  //TODO: Add onchange events to change the state as letters are entered.
  //TODO: Need to pass down state
  // Statement to render
  render(){
    return (
      <div className="formContainer">
        <form id="login_form" onsubmit="handleOnSubmit">
          <label>Username:</label><br></br>
          <input type="text"
                className="userName"
                placeholder="Ex: NancysAppleFingers2021"
                name="userNameLogin"
                onchange="handleOnChange">
          </input><br></br>
          <label>Password:</label><br></br>
          <input type="password"
                className="passWord"
                placeholder="Ex: Ftri4>Ftri3"
                name="passwordLogin">
          </input><br></br>
          <h3> Not signed up? </h3><br></br>
          {/* Button uses React Router to go to the Sign-Up Page */}
          <Link to={'/signup'}>
            <button type="submit" id="signUpButton">Sign up</button>
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