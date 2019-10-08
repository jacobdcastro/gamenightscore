import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './styles/App.sty.js';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import AppRoutes from './components/routes/index';

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
            <AppRoutes />
          </AppWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
