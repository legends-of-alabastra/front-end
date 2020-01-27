import React, { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// public
import Auth from './Auth/Auth';

// private
import PrivateRoute from './Auth/PrivateRoute';
import MainWindow from './components/MainWindow';
import Landing from './Landing/Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <Route 
          path="/"
          exact component = { Landing }
        />
        <Route 
          path="/auth"
          exact component = { Auth }
        />
        <Route 
          path="/app"
          exact component = { MainWindow }
        />
        {/* <MainWindow /> */}
      </Router>
    );
  }
}

export default App;
