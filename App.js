import React, { useEffect } from 'react';
import { StatusBar, I18nManager, LogBox, Platform } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import AppNavigator from './src/routes/AppNavigator';
import i18n from './src/i18n';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
]);

// Component to handle RTL updates
const RTLUpdater = ({ children }) => {
  const { isRTL } = useLanguage();
  
  useEffect(() => {
    // Force RTL layout if needed
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      // On Android, we need to restart the app for RTL changes to take effect
      if (Platform.OS === 'android') {
        // You might want to show a message to the user to restart the app
        console.log('Please restart the app to apply RTL changes');
      }
    }
  }, [isRTL]);

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        // @ts-ignore - This is a valid style
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {children}
    </SafeAreaProvider>
  );
};

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider>
          <RTLUpdater>
            <AppNavigator />
          </RTLUpdater>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

export default App;
