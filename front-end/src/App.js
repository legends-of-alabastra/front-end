<<<<<<< HEAD
import React from 'react';
import Login from './components/state/types/Login'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={() => <Login />} />
      </Router>
    </div>
  );
=======
import React, { Component } from 'react';
// import axios from 'axios';

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// public
import Auth from './Auth/Auth';

// private
// import PrivateRoute from './Auth/PrivateRoute';
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
>>>>>>> cde4afec0a24b218657f3aa59a627227d665ff72
}

export default App;
