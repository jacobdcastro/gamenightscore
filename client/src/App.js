import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing from './components/layout/Landing';
import CreateGame from './components/CreateGame';
import './styles/App.sass';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route to="/" component={Landing} />
        <Route to="/create-game" component={CreateGame} />
        {/* <Route to="/join-game" component={JoinGame} /> */}
      </Switch>
    </Router>
  );
};

export default App;
