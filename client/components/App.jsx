import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import  Login  from './login.jsx';
import  SignUp  from './signUp.jsx';
import  Results  from './results.jsx';
import AddMovie from './addMovie.jsx';

const App = props => {
  return (
    <Router>
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
              <Route
              exact
              path="/results"
              component={Results}
              />
              <Route
              exact
              path="/addMovie"
              component={AddMovie}
              />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
export default App;
