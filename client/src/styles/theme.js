import { createMuiTheme } from '@material-ui/core/styles';

// styled-comonents theme colors
// distributed via <ThemeProvider>
const theme = {
  orange: '#ef4423',
  blue: '#00559f',
  green: '#168f45',
  yellow: '#faed24',
};

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.blue,
    },
    secondary: {
      main: theme.yellow,
    },
    error: {
      main: theme.orange,
    },
    green: {
      main: theme.green,
    },
  },
});

export { theme, muiTheme };
