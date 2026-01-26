import React, { useEffect, useState } from 'react';
import { StatusBar, I18nManager, LogBox, Platform } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import AppNavigator from './src/routes/AppNavigator';
import i18n, { loadSavedLanguage } from './src/i18n';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
]);

// Component to handle RTL updates
const RTLUpdater = ({ children }) => {
  const { isRTL } = useLanguage();
  
  useEffect(() => {
    // Force LTR layout to keep header, menu, and tabs consistent
    if (I18nManager.isRTL !== false) {
      I18nManager.forceRTL(false);
    }
  }, [isRTL]);

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        // Always use LTR direction for consistent layout
        direction: 'ltr',
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        await loadSavedLanguage();
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, []);

  if (isLoading) {
    // You can return a loading screen here
    return null;
  }

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
