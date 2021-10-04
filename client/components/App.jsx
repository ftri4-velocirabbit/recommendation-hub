import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import  Login  from './login.jsx';
import  SignUp  from './signUp.jsx';
// import  Results  from './results.jsx';
import AddMovie from './addMovie.jsx';

const App = props => {
  return (
  //remove "Router" which was not needed, made sure to use "/" for the path as /login is not valid
      <div className="router">
        <main>
          <Switch>
            <Route
              exact
              path="/"
              component={Login}
              />
              <Route
              exact
              path="/signUp"
              component={SignUp}
              />
              {/* <Route
              exact
              path="/results"
              component={Results}
              /> */}
              <Route
              exact
              path="/addMovie"
              component={AddMovie}
              />
          </Switch>
        </main>
      </div>

  );
}
export default App;
