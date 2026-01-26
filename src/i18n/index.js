import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './translations/en.json';
import ur from './translations/ur.json';

// Supported languages with their direction
const LANGUAGES = {
  en: { 
    translation: en,
    direction: 'ltr'
  },
  ur: { 
    translation: ur,
    direction: 'rtl'
  },
};

// RTL languages
const RTL_LANGUAGES = ['ur', 'ar', 'he'];

// Get device language with better fallbacks
const getDeviceLanguage = () => {
  try {
    let languageCode = 'en'; // Default to English
    
    if (Platform.OS === 'ios') {
      const settings = NativeModules.SettingsManager.settings;
      const locale = settings.AppleLocale || settings.AppleLanguages[0];
      if (locale) {
        languageCode = locale.split('_')[0].toLowerCase();
      }
    } else if (Platform.OS === 'android') {
      const locale = NativeModules.I18nManager.localeIdentifier || '';
      if (locale) {
        languageCode = locale.split('_')[0].toLowerCase();
      }
    }
    
    // Return the language code if supported, otherwise default to English
    return LANGUAGES[languageCode] ? languageCode : 'en';
    
  } catch (error) {
    console.error('Error getting device language:', error);
    return 'en';
  }
};

// Set app language and direction
const setI18nConfig = (language) => {
  // Don't change layout direction - keep header, menu, and tabs consistent
  // const isRTL = RTL_LANGUAGES.includes(language);
  // I18nManager.forceRTL(isRTL);
  
  // Update document direction for web (if needed)
  if (typeof document !== 'undefined') {
    // document.dir = isRTL ? 'rtl' : 'ltr';
    document.dir = 'ltr'; // Always LTR for consistent layout
    document.documentElement.lang = language;
  }
  
  return language;
};

// Initialize i18n immediately (synchronously for now)
const i18nInstance = i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ur: { translation: ur },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Async function to load saved language and update
const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    
    if (savedLanguage && LANGUAGES[savedLanguage]) {
      await i18n.changeLanguage(savedLanguage);
      setI18nConfig(savedLanguage);
    }
  } catch (error) {
    console.error('Error loading saved language:', error);
  }
};

// Add language change handler
i18n.on('languageChanged', (lng) => {
  setI18nConfig(lng);
});

export { LANGUAGES, setI18nConfig, loadSavedLanguage };
export default i18n;
