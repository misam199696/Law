import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const [secure, setSecure] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isDesktop = width > 600;

  // Load saved language on component mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
          setCurrentLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('userLanguage', language);
      i18n.changeLanguage(language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Must contain at least one uppercase, one lowercase, and one number'
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form submitted:', values);
      // Add your form submission logic here
      // await yourApiCall(values);
      // navigation.navigate('Home');
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    email: '',
    password: '',
    agree: false,
  };

  const insets = useSafeAreaInsets();

  // --- Icons using react-native-vector-icons ---
  const GoogleIcon = () => (
    <View style={[styles.iconWrapper, { backgroundColor: 'white' }]}>
      <Text style={[styles.socialIconText, { color: '#4285F4', fontSize: 16, fontWeight: 'bold' }]}>G</Text>
    </View>
  );

  const FacebookIcon = () => (
    <View style={[styles.iconWrapper, { backgroundColor: '#1877F2' }]}>
      <Text style={[styles.socialIconText, { color: 'white', fontSize: 16, fontWeight: 'bold' }]}>f</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background, paddingTop: 10 }]}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          >
            <ScrollView
              contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={[
                styles.card,
                isDesktop && styles.cardDesktop,
                { backgroundColor: colors.background }
              ]}>
                <View style={styles.headerContainer}>
                  <View>
                    <Text style={[styles.title, { color: colors.text }]}>{t('welcomeBack')},</Text>
                    <Text style={[styles.title, { color: colors.text }]}>{t('advocate')}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity 
                      style={[
                        styles.languageButton, 
                        currentLanguage === 'en' && styles.languageButtonActive,
                        { marginRight: 8 }
                      ]}
                      onPress={() => changeLanguage('en')}
                    >
                      <Text style={[
                        styles.languageButtonText,
                        { color: currentLanguage === 'en' ? '#FFFFFF' : colors.text }
                      ]}>
                        EN
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.languageButton,
                        currentLanguage === 'ur' && styles.languageButtonActive
                      ]}
                      onPress={() => changeLanguage('ur')}
                    >
                      <Text style={[
                        styles.languageButtonText,
                        { color: currentLanguage === 'ur' ? '#FFFFFF' : colors.text }
                      ]}>
                        اردو
                      </Text>
                    </TouchableOpacity>
                    <ThemeToggleButton style={[styles.themeButton, { marginLeft: 8 }]} />
                  </View>
                </View>
                <Text style={[styles.subtitle, { color: colors.secondary }]}>
                  {t('enterCredentials')}
                </Text>

                {/* Email and Phone Number Row */}
                <View style={styles.row}>
                  {/* Email */}
                  <View style={[styles.halfInputWrapper, { marginRight: 8 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>{t('email')}<Text style={styles.required}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        width: '100%',
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                      },
                      errors.email && touched.email && styles.inputError
                    ]}>
                      <Text style={styles.icon}>✉️</Text>
                      <TextInput
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder={t('emailPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.inputStyle}
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  {/* Phone Number */}
                  <View style={[styles.halfInputWrapper, { marginLeft: 0 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>{t('password')}<Text style={styles.required}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        width: '100%',
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                      },
                      errors.password && touched.password && styles.inputError
                    ]}>
                      <Text style={styles.icon}>🔒</Text>
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder={t('passwordPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={secure}
                        style={[styles.inputStyle, { flex: 1 }]}
                      />
                      <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.eyeIcon}>
                        <Text>{secure ? '👁️' : '👁️‍🗨️'}</Text>
                      </TouchableOpacity>
                    </View>
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                </View>

                {/* Remember Me and Forgot Password Row */}
                <View style={styles.rememberMeRow}>
                  {/* Remember Me Checkbox */}
                  <TouchableOpacity
                    style={styles.termsContainer}
                    activeOpacity={0.8}
                    onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                  >
                    <View style={[
                      styles.circularCheckbox,
                      values.rememberMe && styles.circularCheckboxChecked,
                    ]}>
                      {values.rememberMe && <Text style={styles.checkIcon}>✓</Text>}
                    </View>
                    <Text style={[styles.termsText, { color: colors.text }]}>{t('rememberMe')}</Text>
                  </TouchableOpacity>

                  {/* Forgot Password Link */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>{t('forgotPassword')}</Text>
                  </TouchableOpacity>
                </View>
                {/* Submit Button */}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    (isSubmitting || Object.keys(errors).length > 0) && styles.submitButtonDisabled
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? t('signingIn') : t('signIn')}
                  </Text>
                </TouchableOpacity>

                {/* Social Authentication Buttons */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: colors.background }]}
                    activeOpacity={0.7}
                    onPress={() => console.log('Google')}
                  >
                    <GoogleIcon />
                    <Text style={[styles.socialButtonText, { color: colors.text }]}>{t('continueWithGoogle')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: colors.background }]}
                    activeOpacity={0.7}
                    onPress={() => console.log('Facebook')}
                  >
                    <FacebookIcon />
                    <Text style={[styles.socialButtonText, { color: colors.text }]}>{t('continueWithFacebook')}</Text>
                  </TouchableOpacity>
                </View>

                {/* Sign Up Link */}
                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.footerLink, { color: colors.primary }]}>{t('signUp')}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.footerText, { color: colors.text }]}>  {t('dontHaveAccount')} </Text>
                  
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
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
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  themeButton: {
    marginLeft: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  card: {
    // borderRadius: 32,
    width: '95%',
    padding: 24,
  },
  cardDesktop: {
    maxWidth: 480,
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rememberMeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '68%',
    paddingHorizontal: 4,
  },
  halfInputWrapper: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    borderWidth: 0,
    textAlign: 'left',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
    color: '#9CA3AF',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  circularCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#12B7A6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#FFF',
  },
  circularCheckboxChecked: {
    backgroundColor: '#12B7A6',
  },
  termsText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  forgotPasswordText: {
    fontWeight: '600',
    fontSize: 13,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#12B7A6',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footerLink: {
    fontSize: 14,
    color: '#12B7A6',
    fontWeight: '700',
  },
  socialContainer: {
    width: '100%',
    marginTop: 24,
    marginBottom: 16,
  },
  socialButton: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});

export default LoginScreen;
