import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const ForgetPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const isDesktop = width > 600;
  const isTablet = width > 768;

  const insets = useSafeAreaInsets();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('form.errors.emailRequired'))
      .email(t('form.errors.invalidEmail'))
  });

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage) {
          changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadLanguage();
  }, [changeLanguage]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setSubmitting(true);

    try {
      // TODO: Implement actual API call for password reset
      console.log('Password reset requested for:', values.email);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setSubmitting(false);
        Alert.alert(
          t('forgetPassword.success'),
          t('forgetPassword.resetEmailSent'),
          [
            {
              text: t('common.ok'),
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setSubmitting(false);
      Alert.alert(
        t('common.error'),
        t('forgetPassword.failedToSend'),
        [{ text: t('common.ok'), style: 'cancel' }]
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={[styles.keyboardAvoidingView, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={[
          styles.content,
          {
            paddingTop: insets.top + getResponsiveValue(20, 30, 40),
            paddingBottom: insets.bottom + 20,
          }
        ]}>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <View style={{ flex: 1 }}>
                {/* Header with Language and Theme Toggle */}
                <View style={[
                  styles.headerContainer,
                  { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }
                ]}>
                  <View style={{ flex: 1, alignItems: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }}>
                    <Text style={[styles.title, { color: colors.text, alignSelf: currentLanguage === 'en' ? 'left' : 'right' }]}>
                      {t('forgetPassword.title')}
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.secondary, alignSelf: currentLanguage === 'en' ? 'left' : 'right' }]}>
                      {t('forgetPassword.subtitle')}
                    </Text>
                  </View>
                 
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { 
                    color: colors.text,
                    alignSelf: currentLanguage === 'en' ? 'left' : 'right',
                    writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl'
                  }]}>
                    {t('form.email')} <Text style={styles.required}>*</Text>
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    {
                      backgroundColor: colors.card,
                      borderColor: touched.email && errors.email ? colors.error : colors.border,
                      // flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 12
                    }
                  ]}>
                    <Text style={[styles.icon, { color: colors.primary }]}>📧</Text>
                    <TextInput
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder={t('form.emailPlaceholder')}
                      placeholderTextColor={colors.secondary}
                      style={[
                        styles.inputStyle, 
                        { 
                          color: colors.text,
                          textAlign: currentLanguage === 'en' ? 'left' : 'right',
                          writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl',
                          flex: 1,
                          marginLeft: currentLanguage === 'en' ? 8 : 0,
                          marginRight: currentLanguage === 'en' ? 0 : 8
                        }
                      ]}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={[styles.errorText, { color: colors.error }]}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    {
                      backgroundColor: isLoading || isSubmitting || !values.email.trim() ? colors.border : colors.primary,
                      opacity: isLoading || isSubmitting || !values.email.trim() ? 0.6 : 1,
                    }
                  ]}
                  onPress={handleSubmit}
                  disabled={isLoading || isSubmitting || !values.email.trim()}
                >
                  <Text style={styles.submitButtonText}>
                    {isLoading || isSubmitting ? t('forgetPassword.sending') : t('forgetPassword.sendResetLink')}
                  </Text>
                </TouchableOpacity>

                {/* Login Link */}
                <View style={[
                  styles.loginContainer,
                  { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }
                ]}>
                  
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.loginLink, { color: colors.primary }]}>
                      {t('common.signIn')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: getResponsiveValue(16, 20, 24),
  },
  languageButton: {
    paddingHorizontal: getResponsiveValue(8, 10, 12),
    paddingVertical: getResponsiveValue(4, 5, 6),
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  languageButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  languageButtonText: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '500',
  },
  themeButton: {
    marginLeft: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: getResponsiveValue(8, 10, 12),
    paddingHorizontal: getResponsiveValue(16, 18, 20),
    borderWidth: 1,
    borderRadius: getResponsiveValue(8, 10, 12),
    marginBottom: getResponsiveValue(16, 20, 24),
  },
  backButtonText: {
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '500',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveValue(32, 40, 48),
  },
  title: {
    fontSize: getResponsiveValue(24, 28, 32),
    fontWeight: '800',
    marginBottom: getResponsiveValue(8, 10, 12),
    textAlign: 'left',
  },
  subtitle: {
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '500',
    textAlign: 'left',
    opacity: 0.8,
    lineHeight: getResponsiveValue(20, 22, 24),
  },
  inputGroup: {
    marginBottom: getResponsiveValue(24, 28, 32),
  },
  label: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '600',
    marginBottom: getResponsiveValue(6, 7, 8),
  },
  required: {
    color: '#EF4444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: getResponsiveValue(8, 10, 12),
    height: getResponsiveValue(48, 52, 56),
    paddingHorizontal: getResponsiveValue(12, 14, 16),
  },
  icon: {
    marginRight: getResponsiveValue(10, 12, 14),
    fontSize: getResponsiveValue(18, 20, 22),
  },
  inputStyle: {
    flex: 1,
    fontSize: getResponsiveValue(14, 15, 16),
    color: '#000',
  },
  errorText: {
    fontSize: getResponsiveValue(12, 13, 14),
    marginTop: getResponsiveValue(4, 5, 6),
  },
  submitButton: {
    borderRadius: getResponsiveValue(10, 12, 14),
    height: getResponsiveValue(50, 54, 58),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getResponsiveValue(16, 20, 24),
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getResponsiveValue(16, 20, 24),
  },
  loginText: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '400',
  },
  loginLink: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '600',
  },
});

export default ForgetPasswordScreen;
