import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Landing from './components/pages/Landing';
import CreateGame from './components/pages/CreateGame';
import JoinGame from './components/pages/JoinGame';
import AppWrapper from './styles/App.sty.js';

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route exact path="/create-game" component={CreateGame} />
          <Route exact path="/join-game" component={JoinGame} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default App;
