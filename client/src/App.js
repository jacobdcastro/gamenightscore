import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing from './components/layout/Landing';
// import setAuthToken from './utils/setAuthToken';
import './App.css';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  return (
    <Router>
      <Route exact to="/" component />
      <Switch></Switch>
    </Router>
  );
};

export default App;
