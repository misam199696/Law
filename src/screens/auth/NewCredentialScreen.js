import React, { useState , useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  useColorScheme,
  Dimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import LanguageContext, { useLanguage } from '../../context/LanguageContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const isMediumScreen = width > 375 && width <= 414;
const isLargeScreen = width > 414;

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const NewCredentialScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumberOrSpecial: false
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

  // Password strength checker
  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumberOrSpecial: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required(t('form.errors.required'))
      .min(8, t('form.errors.passwordMinLength'))
      .matches(/[A-Z]/, t('form.errors.passwordUppercase'))
      .matches(/[a-z]/, t('form.errors.passwordLowercase'))
      .matches(/[0-9!@#$%^&*(),.?":{}|<>]/, t('form.errors.passwordNumberOrSpecial')),
    confirmPassword: Yup.string()
      .required(t('form.errors.required'))
      .oneOf([Yup.ref('newPassword'), null], t('form.errors.passwordMatch'))
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);
      console.log('New credentials submitted:', values);
      // Add your API call here
      // await yourApiCall(values);
      Alert.alert(t('common.success'), t('newCredential.passwordResetSuccess'));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Password reset error:', error);
      Alert.alert(t('common.error'), t('newCredential.passwordResetError'));
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  };

  const insets = useSafeAreaInsets();
  console.log("////////////", currentLanguage
);
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={[
          styles.card,
          { backgroundColor: colors.background }
        ]}>
          <Text style={[styles.title, { color: colors.text , textAlign: 'left',
                    writingDirection: 'ltr'  }]}>
            {t('newCredential.title')}
          </Text>

          {/* Password Requirements */}
          <View style={[styles.requirementsContainer, {  }]}>
            <Text style={[styles.requirementsTitle, { color: colors.text , textAlign: 'left',
                    writingDirection: 'ltr'  }]}>
              {t('newCredential.passwordRequirements')}
            </Text>
            <View style={styles.requirementList}>
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirement, 
                  { 
                    color: passwordStrength.minLength ? '#10B981' : colors.secondary,
                    textAlign: 'left',
                    writingDirection: 'ltr'
                  }
                ]}>
                  {passwordStrength.minLength ? '✓' : '•'} {t('newCredential.minLength')}
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirement, 
                  { 
                    color: passwordStrength.hasUpperCase ? '#10B981' : colors.secondary,
                    textAlign: 'left',
                    writingDirection: 'ltr'
                  }
                ]}>
                  {passwordStrength.hasUpperCase ? '✓' : '•'} {t('newCredential.uppercase')}
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirement, 
                  { 
                    color: passwordStrength.hasLowerCase ? '#10B981' : colors.secondary,
                    textAlign: 'left',
                    writingDirection: 'ltr'
                  }
                ]}>
                  {passwordStrength.hasLowerCase ? '✓' : '•'} {t('newCredential.lowercase')}
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Text style={[
                  styles.requirement, 
                  { 
                    color: passwordStrength.hasNumberOrSpecial ? '#10B981' : colors.secondary,
                    textAlign: 'left',
                    writingDirection: 'ltr'
                  }
                ]}>
                  {passwordStrength.hasNumberOrSpecial ? '✓' : '•'} {t('newCredential.numberOrSpecial')}
                </Text>
              </View>
            </View>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting: formikSubmitting }) => (
              <View style={styles.formContainer}>
                {/* New Password */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text , textAlign: 'left',
                    writingDirection: 'ltr' }]}>
                    {t('newCredential.newPassword')}
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    {
                      backgroundColor: colors.card,
                      borderColor: errors.newPassword && touched.newPassword ? colors.error : colors.border
                       
                    }
                  ]}>
                    <TextInput
                      value={values.newPassword}
                      onChangeText={(text) => {
                        handleChange('newPassword')(text);
                        checkPasswordStrength(text);
                      }}
                      onBlur={handleBlur('newPassword')}
                      placeholder={t('newCredential.enterNewPassword')}
                      placeholderTextColor={colors.secondary}
                      secureTextEntry={secure}
                      style={[
                        styles.inputStyle,
                        {
                          color: colors.text,
                          textAlign: currentLanguage === 'en' ? 'left' : 'right',
                          writingDirection: currentLanguage === 'en' ? 'left' : 'right',
                          flex: 1
                        }
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSecure(!secure)}
                      style={styles.eyeIcon}
                    >
                      <Text>{secure ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                  {errors.newPassword && touched.newPassword && (
                    <Text style={[
                      styles.errorText,
                      {
                        textAlign: currentLanguage === 'en' ? 'left' : 'right',
                        writingDirection: currentLanguage === 'en' ? 'left' : 'right'
                      }
                    ]}>{errors.newPassword}</Text>
                  )}
                </View>

                {/* Confirm Password */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.text , textAlign: 'left',
                    writingDirection: 'ltr' }]}>
                    {t('newCredential.confirmPassword')}
                  </Text>
                  <View style={[
                    styles.inputContainer,
                    {
                      backgroundColor: colors.card,
                      borderColor: errors.confirmPassword && touched.confirmPassword ? colors.error : colors.border
                    }
                  ]}>
                    <TextInput
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      placeholder={t('newCredential.enterConfirmPassword')}
                      placeholderTextColor={colors.secondary}
                      secureTextEntry={secureConfirm}
                      style={[
                        styles.inputStyle,
                        {
                          color: colors.text,
                          textAlign: currentLanguage === 'en' ? 'left' : 'right',
                          writingDirection: currentLanguage === 'en' ? 'left' : 'right',
                          flex: 1
                        }
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSecureConfirm(!secureConfirm)}
                      style={styles.eyeIcon}
                    >
                      <Text>{secureConfirm ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={[
                      styles.errorText,
                      {
                        textAlign: currentLanguage === 'en' ? 'left' : 'right',
                        writingDirection: currentLanguage === 'en' ? 'left' : 'right'
                      }
                    ]}>{errors.confirmPassword}</Text>
                  )}
                </View>

                {/* Buttons */}
                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      { backgroundColor: colors.primary },
                      (isSubmitting || formikSubmitting) && styles.submitButtonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting || formikSubmitting}
                  >
                    <Text style={styles.submitButtonText}>
                      {isSubmitting || formikSubmitting ? t('common.submitting') : t('common.submit')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.cancelButton, { borderColor: colors.border }]}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                      {t('common.cancel')}
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
  card: {
    flex: 1,
    padding: getResponsiveValue(20, 24, 28),
    justifyContent: 'center',
  },
  title: {
    fontSize: getResponsiveValue(24, 28, 32),
    fontWeight: '800',
    marginBottom: getResponsiveValue(24, 28, 32),
    textAlign: 'center',
  },
  requirementsContainer: {
    marginBottom: getResponsiveValue(32, 36, 40),
  },
  requirementsTitle: {
    fontSize: getResponsiveValue(16, 18, 20),
    fontWeight: '600',
    marginBottom: getResponsiveValue(12, 14, 16),
  },
  requirementList: {
    paddingLeft: getResponsiveValue(8, 10, 12),
  },
  requirementItem: {
    marginBottom: getResponsiveValue(4, 5, 6),
  },
  requirement: {
    fontSize: getResponsiveValue(14, 15, 16),
    marginBottom: getResponsiveValue(3, 4, 6),
    lineHeight: getResponsiveValue(20, 22, 24),
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: getResponsiveValue(15, 18, 20),
  },
  label: {
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '500',
    marginBottom: getResponsiveValue(8, 9, 10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: getResponsiveValue(8, 10, 12),
    height: getResponsiveValue(50, 54, 58),
    paddingHorizontal: getResponsiveValue(16, 18, 20),
  },
  inputStyle: {
    fontSize: getResponsiveValue(16, 17, 18),
    flex: 1,
  },
  eyeIcon: {
    padding: getResponsiveValue(8, 9, 10),
  },
  errorText: {
    color: '#EF4444',
    fontSize: getResponsiveValue(12, 13, 14),
    marginTop: getResponsiveValue(6, 7, 8),
  },
  buttonContainer: {
    marginTop: getResponsiveValue(32, 36, 40),
    flexDirection: 'row-reverse',
    gap: getResponsiveValue(12, 14, 16),
  },
  submitButton: {
    backgroundColor: '#12B7A6',
    borderRadius: getResponsiveValue(10, 11, 12),
    height: getResponsiveValue(54, 57, 60),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: getResponsiveValue(16, 17, 18),
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: getResponsiveValue(10, 11, 12),
    height: getResponsiveValue(54, 57, 60),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  cancelButtonText: {
    fontSize: getResponsiveValue(16, 17, 18),
    fontWeight: '500',
  },
});

export default NewCredentialScreen;
