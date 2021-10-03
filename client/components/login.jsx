import React, { Component } from 'react';
import  { Link } from 'react-router-dom';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameLogin: ''
      passwordLogin: ''
    }
  }

  handleOnChange = (event, name) => { //?How can we get the input name so this function can be used for password too?
    // Pass in the data we need to send
    const body = { event };

    // GET data from backend to verify user and PW

      this.setState({
        userNameLogin: resp.params.userNameLogin,
        passwordLogin: resp.params.passwordLogin
      });
    }
    )

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
        return <Redirect to="/results" />
      })
    .catch(err => {
      return alert('Incorrect username or password.')
    }
    }
    )

  //TODO: Add onchange events to change the state as letters are entered.
  //TODO: Need to pass down state
  // Statement to render
  render(){
    return (
      <div className="loginContainer">
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
            <input type="submit" id="signUpButton">Sign up</input>
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