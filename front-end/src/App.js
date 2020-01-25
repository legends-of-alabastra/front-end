import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// public
import Auth from './Pages/Auth/Auth';

// private
import PrivateRoute from './Pages/Auth/PrivateRoute';
import MainWindow from './Pages/MainApp/layout/MainWindow';

class App extends Component {
  render() {
    const _tempLanding = { 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw'
    }

    return (
      <Router>
        <Route 
          path="/"
          exact render = { props => (
            <div style = { _tempLanding }>
              <Link to="/auth">Auth</Link>
              &nbsp;|&nbsp;
              <Link to="/app">App</Link>
            </div>
          )}
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
