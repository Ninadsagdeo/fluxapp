import React from 'react';

import Main from './main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
  primary: {main:'#039be5'},
  secondary: {main: '#212834',},
  },
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Main/>
    </MuiThemeProvider>

  );
}

export default App;
