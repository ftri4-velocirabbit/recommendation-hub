import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './login.jsx';
import SignUp from './signUp.jsx';
import Results from './results.jsx';
import AddMovie from './addMovie';

const App = () => {
  return (
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
            component={Login}
            />
            <Route
            exact
            path="/results"
            component={Login}
            />
            <Route
            exact
            path="/addMovie"
            component={Login}
            />
        </Switch>
      </main>
    </div>
  );
}
export default App;
