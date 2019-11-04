import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './styles/App.sty.js';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/theme';
import { muiTheme } from './styles/theme';
import AppRoutes from './components/routes/index';

import store from './redux/store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={theme}>
            <AppWrapper>
              <AppRoutes />
            </AppWrapper>
          </ThemeProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
