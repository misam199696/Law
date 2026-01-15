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
  Modal
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';


const { width } = Dimensions.get('window');

const SignupCreateAccount = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const [secure, setSecure] = useState(true);
  const [selectedType, setSelectedType] = useState(route?.params?.userType || null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
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
        phoneNumber: values.email, // Using email as phone number for demo
        accountType: selectedType
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


  const accountTypes = [
    {
      id: 'public',
      title: t('signup.publicUser'),
      description: t('signup.publicUserDesc'),
      icon: 'person-outline',
      iconColor: '#FFA500',
      iconBg: '#FFF5E6'
    },
    {
      id: 'individual',
      title: t('signup.individualUser'),
      description: t('signup.individualUserDesc'),
      icon: 'business',
      iconColor: '#00BFA5',
      iconBg: '#E6F7F5'
    },
    {
      id: 'lawFirm',
      title: t('signup.lawFirm'),
      description: t('signup.lawFirmDesc'),
      icon: 'gavel',
      iconColor: '#FF5252',
      iconBg: '#FFEBEE'
    }
  ];


  const isDarkMode = useColorScheme() === 'dark';

  const dynamicStyles = StyleSheet.create({
    card: {
      height: 50,
      width: 164,
      borderRadius: 12,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    cardSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.lightBlue
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: isDarkMode === 'dark' ? '#020202ff' : colors.text,
        marginBottom: 4,
    },
    dropdown: {
        fontSize: 12,
        fontWeight: '700',
        color: isDarkMode === 'dark' ? '#020202ff' : colors.text,
        marginBottom: 4,
        
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
                            color: colors.text,
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
                      {t('signup.agreeToTerms')} <Text style={[styles.linkText, { color: colors.primary }]}>{t('signup.privacyPolicyAndTerms')}</Text> *
                    </Text>
                  </TouchableOpacity>

                </View>

                {/* Sign In Button */}
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse', height:60, width:'100%' }}>
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

                  {/* Selected Type Display */}
                  <View style={styles.cardsContainer}>
                    {selectedType && accountTypes.map((type) => (
                      type.id === selectedType && (
                        <TouchableOpacity
                          key={type.id}
                          style={[
                            dynamicStyles.card,
                            dynamicStyles.cardSelected
                          ]}
                          onPress={() => setShowAccountTypeModal(true)}
                          activeOpacity={0.8}
                        >
                          <View style={[styles.cardContent, { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }]}>
                            <View style={[styles.iconContainer, { backgroundColor: type.iconBg }]}>
                              <Icon
                                name={type.icon}
                                size={20}
                                color={type.iconColor}
                              />
                            </View>
                            <View style={styles.textContainer}>
                              <Text style={[dynamicStyles.cardTitle, { alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }]}>
                                {type.id === 'public'
                                  ? t('signup.publicUser')
                                  : type.id === 'individual'
                                    ? t('signup.individualUser')
                                    : t('signup.lawFirm')}
                              </Text>
                              <Text style={[dynamicStyles.dropdown, {}]}>   ⌄ </Text>
                            </View>
                            
                          </View>
                        </TouchableOpacity>
                      )
                    ))}
                  </View>
                </View>

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
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.footerLink, { color: colors.primary }]}>{t('signIn')}</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>

      {/* Account Type Selection Modal */}
      <Modal
        visible={showAccountTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAccountTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={[styles.modalHeader, { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('signup.chooseAccountType')}</Text>
              <TouchableOpacity onPress={() => setShowAccountTypeModal(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              {accountTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.accountTypeOption,
                    { backgroundColor: colors.card, borderColor: colors.border },
                    selectedType === type.id && { backgroundColor: colors.lightBlue, borderColor: colors.primary }
                  ]}
                  onPress={() => {
                    setSelectedType(type.id);
                    setShowAccountTypeModal(false);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={[styles.optionContent, { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }]}>
                    <View style={[styles.optionIcon, { backgroundColor: type.iconBg }]}>
                      <Icon name={type.icon} size={24} color={type.iconColor} />
                    </View>
                    <View style={styles.optionText}>
                      <Text style={[styles.optionTitle, { color: colors.text, alignSelf: currentLanguage === 'en' ?  'flex-start' : 'flex-end' }]}>
                        {type.id === 'public'
                          ? t('signup.publicUser')
                          : type.id === 'individual'
                            ? t('signup.individualUser')
                            : t('signup.lawFirm')}
                      </Text>
                      <Text style={[styles.optionDescription, { color: colors.secondary , alignSelf: currentLanguage === 'en' ?  'flex-start' : 'flex-end' }]}>
                        {type.id === 'public'
                          ? t('signup.publicUserDesc')
                          : type.id === 'individual'
                            ? t('signup.individualUserDesc')
                            : t('signup.lawFirmDesc')}
                      </Text>
                    </View>
                   
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    width: '97%',
    padding: 24,
  },
  cardDesktop: {
    maxWidth: 480,
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
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
    width: '100%',
    marginBottom: 16,
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

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
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
  linkText: {
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#12B7A6',
    borderRadius: 12,
    height: 50,
    width: '50%',
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
    marginTop: 6,
    marginBottom: 16,
  },
  socialButton: {
    width: '100%',
    height: 40,
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
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },

  cardsContainer: {
    gap: 16,
  },

  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalBody: {
    gap: 12,
  },
  accountTypeOption: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  optionContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    paddingHorizontal: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default SignupCreateAccount;
