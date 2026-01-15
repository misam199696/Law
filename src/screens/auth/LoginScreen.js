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

const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const [secure, setSecure] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isDesktop = width > 600;
  const isTablet = width > 768;

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
console.log();

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
      console.log('Login attempt with:', values);
      // In a real app, you would verify credentials here first
      // Then navigate to OTP verification
      navigation.navigate('OTPVerification', { 
        phoneNumber: values.email // Using email as phone number for demo
      });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to sign in. Please try again.');
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
      <Text style={[styles.socialIconText, { color: '#4285F4', fontSize: 16, fontWeight: 'bold' }]}>G</Text>
  );

  const FacebookIcon = () => (
      <Text style={[styles.socialIconText, { color: 'white', fontSize: 16, fontWeight: 'bold' }]}>f</Text>
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
                isTablet && styles.cardTablet,
                { backgroundColor: colors.background }
              ]}>
                <View style={[styles.headerContainer ,{ flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }]}>
                  <View >
                    <Text style={[styles.title, { color: colors.text }]}>{t('welcomeBack')},</Text>
                    <Text style={[styles.title, { color: colors.text }]}>{t('advocate')}</Text>
                  </View>
                  <View style={{ flexDirection:  'row', alignItems: 'center' }}>
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
                <Text style={[styles.subtitle, { color: colors.secondary , textAlign: currentLanguage === 'en' ? 'left' : 'right' }]}>
                  {t('enterCredentials')}
                </Text>

                {/* Email and password */}
                <View style={styles.row}>
                  {/* Email */}
                  <View style={[styles.halfInputWrapper, { marginRight: 8 }]}>
                    <Text style={[styles.label, { 
                      color: colors.text,
                      textAlign: currentLanguage === 'en' ? 'left' : 'right',
                      writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl'
                    }]}>
                      {t('email')}<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        width: '100%',
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 12
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
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  {/* Password */}
                  <View style={[styles.halfInputWrapper, { marginLeft: 0 }]}>
                    <Text style={[{
                      color: colors.text,
                      textAlign: currentLanguage === 'en' ? 'left' : 'right',
                      writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl',
                      marginBottom: 4
                    }]}>
                      {t('password')}<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        width: '100%',
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 12
                      },
                      errors.password && touched.password && styles.inputError
                    ]}>
                      {currentLanguage === 'ur' && (
                        <TouchableOpacity 
                          onPress={() => setSecure(!secure)} 
                          style={styles.eyeIcon}
                        >
                          <Text>{secure ? '👁️' : '👁️‍🗨️'}</Text>
                        </TouchableOpacity>
                      )}
                      <Text style={styles.icon}>🔒</Text>
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder={t('passwordPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={secure}
                        style={[
                          styles.inputStyle,
                          {
                            color:  colors.text,
                            textAlign: currentLanguage === 'en' ? 'left' : 'right',
                            writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl',
                            flex: 1,
                            marginLeft: currentLanguage === 'en' ? 8 : 8,
                            marginRight: currentLanguage === 'en' ? 8 : 20
                          }
                        ]}
                      />
                      {currentLanguage === 'en' && (
                        <TouchableOpacity 
                          onPress={() => setSecure(!secure)} 
                          style={styles.eyeIcon}
                        >
                          <Text>{secure ? '👁️' : '👁️‍🗨️'}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                </View>

                {/* Remember Me and Forgot Password Row */}

                <View style={[styles.rememberMeRow, { 
                  flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }]}>
                  {/* Remember Me Checkbox */}
                  <TouchableOpacity
                    style={[
                      styles.termsContainer,
                      {
                        flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
                        alignItems: 'center'
                      }
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                  >
                    <View style={[
                      styles.circularCheckbox,
                      values.rememberMe && styles.circularCheckboxChecked,
                      { 
                        marginRight: currentLanguage === 'en' ? 8 : 0,
                        marginLeft: currentLanguage === 'en' ? 0 : 8 
                      }
                    ]}>
                      {values.rememberMe && <Text style={styles.checkIcon}>✓</Text>}
                    </View>
                    <Text style={[styles.termsText, { 
                      color: colors.text,
                      textAlign: currentLanguage === 'en' ? 'left' : 'right',
                      writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl'
                    }]}>
                      {t('rememberMe')}
                    </Text>
                  </TouchableOpacity>

                  {/* Forgot Password Link */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    style={{
                      marginStart: currentLanguage === 'en' ? getResponsiveValue(-80, -95, -110) : 0,
                      marginEnd: currentLanguage === 'en' ? 0 : getResponsiveValue(-150, -175, -200)
                    }}
                  >
                    <Text 
                      style={[
                        styles.forgotPasswordText, 
                        { 
                          color: colors.primary,
                          textAlign: currentLanguage === 'en' ? 'right' : 'left',
                          writingDirection: currentLanguage === 'en' ? 'right' : 'left'
                        }
                      ]}
                    >
                      {t('forgotPassword')}
                    </Text>
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

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                  <Text style={[styles.dividerText, { color: colors.secondary }]}>{t('orContinueWith')}</Text>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                </View>

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
                  <Text style={[styles.footerText, { color: colors.text }]}>{t('dontHaveAccount')} </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignupType')}>
                    <Text style={[styles.footerLink, { color: colors.primary }]}>{t('signUp')}</Text>
                  </TouchableOpacity>

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
  errorText: {
    color: '#EF4444',
    fontSize: getResponsiveValue(10, 11, 12),
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveValue(6, 7, 8),
  },
  themeButton: {
    marginLeft: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: getResponsiveValue(5, 8, 10),
    paddingBottom: 40,
    alignItems: 'center',
  },
  card: {
    width: getResponsiveValue('92%', '94%', '95%'),
    padding: getResponsiveValue(16, 20, 24),
  },
  cardDesktop: {
    maxWidth: 480,
    padding: 40,
  },
  cardTablet: {
    maxWidth: 600,
    padding: 32,
  },
  title: {
    fontSize: getResponsiveValue(24, 28, 32),
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '500',
    marginBottom: getResponsiveValue(20, 24, 32),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: getResponsiveValue(12, 14, 16),
  },
  rememberMeRow: {
    width: '100%',
    marginBottom: getResponsiveValue(12, 14, 16),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#12B7A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularCheckboxChecked: {
    backgroundColor: '#12B7A6',
  },
  termsText: {
    fontSize: 14,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  halfInputWrapper: {
    width: '100%',
  },
  label: {
    fontSize: getResponsiveValue(10, 11, 12),
    fontWeight: '700',
    color: '#374151',
    marginBottom: getResponsiveValue(6, 7, 8),
  },
  required: {
    color: '#EF4444',
  },
  inputStyle: {
    flex: 1,
    fontSize: getResponsiveValue(12, 13, 14),
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    borderWidth: 0,
    textAlign: 'left',
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    height: getResponsiveValue(36, 40, 44),
    paddingHorizontal: getResponsiveValue(10, 12, 12),
    marginBottom: 8,
  },
  icon: {
    marginRight: getResponsiveValue(6, 7, 8),
    fontSize: getResponsiveValue(16, 17, 18),
    color: '#9CA3AF',
  },
  eyeIcon: {
    position: 'absolute',
    right: 1,
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
    fontSize: getResponsiveValue(11, 12, 14),
    fontWeight: '500',
    flex: 1,
  },
  forgotPasswordText: {
    fontWeight: '600',
    fontSize: getResponsiveValue(11, 12, 13),
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#12B7A6',
    borderRadius: 12,
    height: getResponsiveValue(48, 50, 52),
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
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '400',
  },
  footerLink: {
    fontSize: getResponsiveValue(12, 13, 14),
    color: '#12B7A6',
    fontWeight: '700',
  },
  socialContainer: {
    width: '100%',
    marginTop: getResponsiveValue(20, 22, 24),
    marginBottom: 16,
  },
  socialButton: {
    width: '100%',
    height: getResponsiveValue(36, 40, 44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialButtonText: {
    color: '#1F2937',
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '500',
    marginLeft: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getResponsiveValue(16, 18, 20),
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: getResponsiveValue(12, 14, 16),
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '500',
  }
});

export default LoginScreen;
