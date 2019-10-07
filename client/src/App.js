import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';
import CreateGame from './components/pages/CreateGame';
import JoinGame from './components/pages/JoinGame';
import CreatePlayer from './components/pages/CreatePlayer';

import AppWrapper from './styles/App.sty.js';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import store from './redux/store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Switch>
              <Route exact path="/create-game" component={CreateGame} />
              <Route exact path="/join-game" component={JoinGame} />
              <Route exact path="/create-player" component={CreatePlayer} />
              <Route exact path="/" component={Landing} />
            </Switch>
          </AppWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
