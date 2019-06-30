import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core';
import { hot } from 'react-hot-loader';
import Raven from 'raven-js';
import { MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#98DBC6',
      main: '#5BC8AC',
    },
    secondary: {
      main: '#F18D9E',
    },
    background: {
      default: '#F1F1F2',
      paper: '#98DBC6',
    },
  },
  typography: {
    fontSize: 16,
  },
});

class AppWrapper extends React.Component<{children?: any}, {}> {
  public componentDidCatch(error: any, errorInfo: any) {
    Raven.captureException({ error, errorInfo });
  }
  public render(): React.ReactNode {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <React.Fragment>
            {this.props.children}
          </React.Fragment>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(AppWrapper);
