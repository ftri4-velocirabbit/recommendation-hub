import React, { Component } from 'react';
import  { Link } from 'react-router-dom';


class Login extends React.Component {
  // Statement to render
  render(){
    return (
      <div className="loginContainer">
        <form id="login_form">
          <label>Username:</label><br></br>
          <input type="text" className="userName" placeholder="Ex: NancysAppleFingers2021"></input><br></br>
          <label>Password:</label><br></br>
          <input type="password" className="passWord" placeholder="Ex: Ftri4>Ftri3"></input><br></br>
          <input type="button" className="loginButton" place
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