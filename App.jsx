import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import theme from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFF" translucent />
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
