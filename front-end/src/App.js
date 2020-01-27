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
}

export default App;
