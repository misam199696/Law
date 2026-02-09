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
  useColorScheme,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Email from '../../assets/svg/email';
import Password from '../../assets/svg/password';
import Eye from '../../assets/svg/eye';
import EyeOff from '../../assets/svg/eyeOff';
import PublicUser from '../../assets/svg/publicUser';
import IndividualUser from '../../assets/svg/individualUser';
import LawFirm from '../../assets/svg/lawFirm';
import Google from '../../assets/svg/google';
import Facebook from '../../assets/svg/facebook';
import FacebookDark from '../../assets/svg/facebookDark';
import { DarkTheme } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const SignupCreateAccount = ({ navigation, route }) => {
  const { colors, isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [focusedInput, setFocusedInput] = useState(null);
  const [secure, setSecure] = useState(true);
  const [selectedType, setSelectedType] = useState(route?.params?.userType || null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);
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
      console.log('Signup attempt with:', values);
      // In a real app, you would verify credentials here first
      // Then navigate to OTP verification
      navigation.navigate('OTPVerification', {
        phoneNumber: values.email, // Using email as phone number for demo
        accountType: selectedType,
        isLoginFlow: false // This is signup flow, not login
      });
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
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


  const accountTypes = [
    {
      id: 'public',
      title: t('signup.publicUser'),
      description: t('signup.publicUserDesc'),
      icon: <PublicUser width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
      iconColor: '#FFA500',
      iconBg: '#FFF5E6'
    },
    {
      id: 'individual',
      title: t('signup.individualUser'),
      description: t('signup.individualUserDesc'),
                  icon: <IndividualUser width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
      iconColor: '#00BFA5',
      iconBg: '#E6F7F5'
    },
    {
      id: 'lawFirm',
      title: t('signup.lawFirm'),
      description: t('signup.lawFirmDesc'),
                  icon: <LawFirm width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
      iconColor: '#FF5252',
      iconBg: '#FFEBEE'
    }
  ];



  const dynamicStyles = StyleSheet.create({
    card: {
      height: getResponsiveValue(44, 48, 50),
      width: '100%',
      borderRadius: getResponsiveValue(10, 11, 12),
      padding: getResponsiveValue(8, 9, 10),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    cardSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.lightBlue
    },
    cardTitle: {
        fontSize: getResponsiveValue(10, 11, 12),
        fontWeight: '700',
        color: isDarkMode === 'dark' ? '#020202ff' : colors.text,
        marginBottom: getResponsiveValue(3, 4, 4),
    },
    dropdown: {
        fontSize: getResponsiveValue(10, 11, 12),
        fontWeight: '700',
        color: isDarkMode === 'dark' ? '#020202ff' : colors.text,
        marginBottom: getResponsiveValue(3, 4, 4),
        
    }
  });

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

                    <Text style={[styles.title, { color: colors.text, alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }]}>{t('createAccount')}</Text>

                <Text style={[styles.subtitle, { color: colors.secondary, textAlign: currentLanguage === 'en' ? 'left' : 'right' }]}>
                  {t('welcomeSubtitle')}
                </Text>

                {/* Email and password */}
                <View style={styles.row}>
                  {/* Email */}
                  <View style={[styles.halfInputWrapper, { marginRight: 8 }]}>
                    <Text style={[{
                      color: colors.text,
                      textAlign: currentLanguage === 'en' ? 'left' : 'right',
                      writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl',
                      marginBottom: 4
                    }]}>
                      {t('email')}<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        width: '100%',
                        backgroundColor: colors.card,
                        borderColor: focusedInput === 'email' ? '#14B8A6' : colors.border,
                        flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 12
                      },
                      errors.email && touched.email && styles.inputError
                    ]}>
                      <Email />
                      <TextInput
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => {
                          handleBlur('email');
                          setFocusedInput(null);
                        }}
                        onFocus={() => setFocusedInput('email')}
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
                        borderColor: focusedInput === 'password' ? '#14B8A6' : colors.border,
                        flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 12
                      },
                      errors.password && touched.password && styles.inputError
                    ]}>
                      <Password />
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => {
                          handleBlur('password');
                          setFocusedInput(null);
                        }}
                        onFocus={() => setFocusedInput('password')}
                        placeholder={t('passwordPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={secure}
                        style={[
                          styles.inputStyle,
                          {
                            color: colors.text,
                            textAlign: currentLanguage === 'en' ? 'left' : 'right',
                            writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl',
                            flex: 1,
                            marginLeft: currentLanguage === 'en' ? 8 : 8,
                            marginRight: currentLanguage === 'en' ? 8 : 20
                          }
                        ]}
                      />
                        <TouchableOpacity 
                          onPress={() => setSecure(!secure)} 
                          style={[
                            styles.eyeIcon,
                            currentLanguage === 'en' ? { right: 12 } : { left: 12 }
                          ]}
                        >
                          {secure ? <EyeOff width={20} height={20} color="#9CA3AF" /> : <Eye width={20} height={20} color="#9CA3AF" />}
                        </TouchableOpacity>
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
                      {t('signup.agreeToTerms')} <Text style={[styles.linkText, { color: colors.primary }]}>{t('signup.privacyPolicyAndTerms')}</Text> *
                    </Text>
                  </TouchableOpacity>

                </View>

                {/* Sign In Button */}
                <View style={{ alignItems: 'center', width:'100%' }}>
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      (isSubmitting || Object.keys(errors).length > 0) && styles.submitButtonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.submitButtonText}>
                      {isSubmitting ? t('signingUp') : t('signUp')}
                    </Text>
                  </TouchableOpacity>

                 
                </View>

                 {/* Custom Account Type Dropdown */}
                  {/* <View style={styles.cardsContainer}>
                    <TouchableOpacity
                      style={[
                        dynamicStyles.card,
                        selectedType && dynamicStyles.cardSelected
                      ]}
                      onPress={() => setShowDropdown(!showDropdown)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.cardContent, { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }]}>
                        <View style={[styles.iconContainer, { backgroundColor: selectedType ? accountTypes.find(type => type.id === selectedType)?.iconBg : '#F3F4F6' }]}>
                         {selectedType ? accountTypes.find(type => type.id === selectedType)?.icon : 'person-outline'}
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={[
                            dynamicStyles.cardTitle,
                            { 
                              color: selectedType ? colors.text : '#9CA3AF',
                              alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end'
                            }
                          ]}>
                            {selectedType
                              ? accountTypes.find(type => type.id === selectedType)?.id === 'public'
                                ? t('signup.publicUser')
                                : accountTypes.find(type => type.id === selectedType)?.id === 'individual'
                                  ? t('signup.individualUser')
                                  : t('signup.lawFirm')
                              : t('signup.selectAccountType')}
                          </Text>
                          <Text style={[dynamicStyles.dropdown, {}]}>   {showDropdown ? '⌃' : '⌄'} </Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                   
                    {showDropdown && (
                      <View style={[
                        styles.customDropdown,
                        { backgroundColor: colors.card, borderColor: colors.border }
                      ]}>
                        {accountTypes.map((type) => (
                          <TouchableOpacity
                            key={type.id}
                            style={[
                              styles.dropdownOption,
                              { 
                                backgroundColor: selectedType === type.id ? colors.lightBlue : 'transparent',
                                borderColor: colors.border
                              }
                            ]}
                            onPress={() => {
                              setSelectedType(type.id);
                              setShowDropdown(false);
                            }}
                            activeOpacity={0.8}
                          >
                            <View style={[styles.optionContent, { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }]}>
                             
                              <View style={styles.optionText}>
                                <Text style={[styles.optionTitle, { color: colors.text, alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }]}>
                                  {type.id === 'public'
                                    ? t('signup.publicUser')
                                    : type.id === 'individual'
                                      ? t('signup.individualUser')
                                      : t('signup.lawFirm')}
                                </Text>
                               
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View> */}

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
                    <Google />
                    <Text style={[styles.socialButtonText, { color: colors.text }]}>{t('continueWithGoogle')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: colors.background }]}
                    activeOpacity={0.7}
                    onPress={() => console.log('Facebook')}
                  >
                    {isDarkMode=== false ? <Facebook /> : <FacebookDark />}
                    <Text style={[styles.socialButtonText, { color: colors.text }]}>{t('continueWithFacebook')}</Text>
                  </TouchableOpacity>
                </View>

                {/* Sign Up Link */}
                <View style={styles.footer}>
                  <Text style={[styles.footerText, { color: colors.text }]}>{t('dontHaveAccount')} </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.footerLink, { color: colors.primary }]}>{t('signIn')}</Text>
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
    // borderRadius: 32,
    width: getResponsiveValue('95%', '96%', '97%'),
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
    marginBottom: getResponsiveValue(8, 9, 10),
  },
  subtitle: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '500',
    marginBottom: getResponsiveValue(24, 28, 32),
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
    width: getResponsiveValue(18, 20, 22),
    height: getResponsiveValue(18, 20, 22),
    borderRadius: getResponsiveValue(9, 10, 11),
    borderWidth: 2,
    borderColor: '#12B7A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularCheckboxChecked: {
    backgroundColor: '#12B7A6',
  },
  termsText: {
    fontSize: getResponsiveValue(12, 13, 14),
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
    height: getResponsiveValue(44, 48, 50),
    paddingHorizontal: getResponsiveValue(10, 11, 12),
    marginBottom: 8,
  },
  icon: {
    marginRight: getResponsiveValue(6, 7, 8),
    fontSize: getResponsiveValue(16, 17, 18),
    color: '#9CA3AF',
  },
  eyeIcon: {
    position: 'absolute',
    top: getResponsiveValue(10, 11, 12),
    zIndex: 1,
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
    fontSize: getResponsiveValue(11, 12, 13),
    fontWeight: '500',
    flex: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#12B7A6',
    borderRadius: 12,
    height: getResponsiveValue(46, 48, 50),
    width: '100%',
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
    marginTop: getResponsiveValue(4, 5, 6),
    marginBottom: 16,
  },
  socialButton: {
    width: '100%',
    height: getResponsiveValue(36, 38, 40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e5e7eb9a',
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
    marginVertical: getResponsiveValue(24, 27, 30),
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: getResponsiveValue(12, 14, 16),
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '500',
  },

  cardsContainer: {
    gap: getResponsiveValue(12, 14, 16),
  },

  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: getResponsiveValue(24, 27, 30),
    height: getResponsiveValue(24, 27, 30),
    borderRadius: getResponsiveValue(10, 11, 12),
    justifyContent: 'center',
    alignItems: 'center',

  },
  textContainer: {
    paddingHorizontal: getResponsiveValue(8, 9, 10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Custom Dropdown Styles
  customDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: getResponsiveValue(12, 14, 16),
    borderWidth: 1,
    marginTop: getResponsiveValue(4, 5, 6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownOption: {
    padding: getResponsiveValue(11, 13, 15),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionIcon: {
    width: getResponsiveValue(40, 44, 48),
    height: getResponsiveValue(40, 44, 48),
    borderRadius: getResponsiveValue(10, 11, 12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    paddingHorizontal: getResponsiveValue(12, 14, 16),
  },
  optionTitle: {
    fontSize: getResponsiveValue(12, 14, 15),
    fontWeight: '700',
    marginBottom: getResponsiveValue(3, 4, 4),
  },
  optionDescription: {
    fontSize: getResponsiveValue(12, 13, 14),
    lineHeight: getResponsiveValue(16, 18, 20),
  },
  radioButton: {
    width: getResponsiveValue(18, 20, 20),
    height: getResponsiveValue(18, 20, 20),
    borderRadius: getResponsiveValue(9, 10, 10),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: getResponsiveValue(8, 9, 10),
    height: getResponsiveValue(8, 9, 10),
    borderRadius: getResponsiveValue(4, 5, 5),
  },
});

export default SignupCreateAccount;
