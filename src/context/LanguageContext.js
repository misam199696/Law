import React, { createContext, useState, useEffect, useContext } from 'react';
import { I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { LANGUAGES } from '../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isRTL, setIsRTL] = useState(false);

  const changeLanguage = async (language) => {
    try {
      if (!LANGUAGES[language]) {
        console.warn(`Language '${language}' is not supported`);
        return;
      }
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('userLanguage', language);
      
      // Update i18n language
      await i18n.changeLanguage(language);
      
      // Update RTL settings
      const shouldBeRTL = LANGUAGES[language].direction === 'rtl';
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.forceRTL(shouldBeRTL);
        // On Android, we need to restart the app for RTL changes to take effect
        if (Platform.OS === 'android') {
          // You might want to show a message to the user to restart the app
          console.log('Please restart the app to apply RTL changes');
        }
      }
      
      setCurrentLanguage(language);
      setIsRTL(shouldBeRTL);
      
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Set initial language
  useEffect(() => {
    // Load saved language from AsyncStorage
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage && LANGUAGES[savedLanguage]) {
          changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading saved language:', error);
      }
    };
    
    loadSavedLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage,
      isRTL,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
