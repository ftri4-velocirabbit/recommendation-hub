import React, { Component } from 'react';
import  { Link, Redirect } from 'react-router-dom';




class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameLogin: '',
      passwordLogin: '',
      redirect: false
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
    const body = { event } // todo this is off

    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state) //! Data will have to be parsed into the usernamLogin and passwordLogin in the BACKEND
    })
    .then(resp => resp.json())
    .then(() => {
      // Once userNameLogin and passwordLogin are verified and we receive the response, we will redirect to the results page
      this.setState({ redirect: true });
    })
    .catch(err => {
      // A userNameLogin & passwordLogin mismatch or missing UserNameLogin will result in an alert and more opportunitites to try agian.

      return alert('Incorrect username or password.')
    });
  };

  //TODO: Need to pass down state
  // Statement to render
  render() {

    //console.log({state: this.state.userNameLogin});
    //const { userNameLogin } = this.state;
    const { redirect } = this.state;
    {if (redirect) {
      return <Redirect to='/results'/>
    }}

    const {userNameLogin} = this.state;

    // const location = {
    //   pathname: '/addmovie',
    //   state: { userNameLogin: this.state.userNameLogin}
    // }  //link on 96

    //console.log('username:', UserNameLogin);
    return (
      <div className="formContainer">
        <h1 id='title_id'>Recommendation Hub</h1>
          <form id="login_form" onSubmit={this.handleOnSubmit}>
            <label>Username:</label><br></br>
            <input type="text"
                  className="inputValue_input"
                  placeholder="Ex: NancysAppleFingers2021"
                  name="userNameLogin"
                  value={this.state.userNameLogin}
                  onChange={this.handleOnChange}>
            </input><br></br>
            <label>Password:</label><br></br>
            <input type="password"
                  className="inputValue_input"
                  placeholder="Ex: Ftri4>Ftri3"
                  name="passwordLogin"
                  value={this.state.passwordLogin}
                  onChange={this.handleOnChange}>
            </input><br></br>
            <button type="submit" className="submit_button" id="login_Button">Log in</button><br></br>

            {/* Button uses React Router to go to the Sign-Up Page */}
            <br></br>
            <span id="notSignedUp_span"> Not signed up? </span><br></br>
            <Link to={'/signup'}>
              <button type="button" className="submit_button" id="signUpButton">Sign up</button>
            </Link>
          </form>

        <Link to={{pathname:'/addmovie', state:{userNameLogin}}}>
          <button type="button" id="addMovieTemp">Temp Route To Add Movie</button>
        </Link>
        <Link to={{pathname:'/results', state:{userNameLogin}}}>
          <button type="button" id="resultsButton">Results Page</button>
        </Link>
        <Link to={{pathname:'/addGroup', state:{userNameLogin}}}>
          <button type="button" id="addGrpBtn">Add Group Page</button>
        </Link>
      </div>
    )
  }
}




export default Login;