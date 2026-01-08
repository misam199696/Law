import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules, I18nManager } from 'react-native';
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
  const isRTL = RTL_LANGUAGES.includes(language);
  
  // Update layout direction
  I18nManager.forceRTL(isRTL);
  
  // Update document direction for web
  if (typeof document !== 'undefined') {
    document.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }
  
  return language;
};

// Initialize i18n
const initI18n = () => {
  const defaultLanguage = 'en'; // Force English as default
  const initialLanguage = setI18nConfig(defaultLanguage);
  
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ur: { translation: ur },
      },
      lng: initialLanguage,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
    
  // Add language change handler
  i18n.on('languageChanged', (lng) => {
    setI18nConfig(lng);
  });

  return i18n;
};

export { LANGUAGES, setI18nConfig };
export default initI18n();
