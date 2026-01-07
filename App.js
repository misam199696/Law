import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/routes/AppNavigator';

function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
