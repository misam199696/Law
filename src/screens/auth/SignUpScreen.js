
import React, { useState } from 'react';
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
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

/**
 * SignUpScreen Component
 * A comprehensive registration screen for legal advocates with professional profile fields.
 */
const CustomPicker = ({ label, selectedValue, onValueChange, items, placeholder }) => {
  const { colors, isDark } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const getDisplayValue = () => {
    const selectedItem = items.find(item => item.value === selectedValue);
    return selectedItem ? selectedItem.label : placeholder;
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[styles.inputContainer, { 
          backgroundColor: colors.card, 
          borderColor: colors.border,
          justifyContent: 'space-between',
          paddingRight: 12
        }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.inputStyle, { color: selectedValue ? colors.text : colors.secondary }]}>
          {getDisplayValue()}
        </Text>
        <Text style={[styles.dropdownIcon, { color: colors.text }]}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.pickerHeader, { 
            borderBottomWidth: 1, 
            borderBottomColor: colors.border,
            backgroundColor: colors.card
          }]}>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={{ padding: 12 }}
            >
              <Text style={[styles.pickerButton, { color: colors.primary }]}>Done</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              onValueChange(itemValue);
              setModalVisible(false);
            }}
            style={[styles.picker, { backgroundColor: colors.background }]}
            dropdownIconColor={colors.text}
            dropdownIconRippleColor={colors.primary}
            itemStyle={[styles.pickerItem, { 
              color: colors.text,
              backgroundColor: colors.background
            }]}
          >
            <Picker.Item 
              label={placeholder || 'Select an option...'} 
              value="" 
              color={colors.secondary}
            />
            {items.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.label}
                value={item.value}
                color={item.value === selectedValue ? colors.primary : colors.text}
                style={{ 
                  backgroundColor: item.value === selectedValue ? 
                    (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent',
                  padding: 8,
                  fontSize: 16
                }}
              />
            ))}
          </Picker>
        </View>
      </Modal>
    </View>
  );
};

const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [secure, setSecure] = useState(true);
  const isDesktop = width > 600;

  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'Too short')
      .max(50, 'Too long'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Too short')
      .max(50, 'Too long'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
      .min(10, 'Too short')
      .max(15, 'Too long'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be less than 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Must contain at least one uppercase, one lowercase, and one number'
      ),
    country: Yup.string()
      .required('Country is required'),
    profession: Yup.string()
      .required('Profession is required'),
    agree: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
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

  // Define picker options
  const countryOptions = [
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'United Kingdom', value: 'UK' },
  ];

  const professionOptions = [
    { label: 'Lawyer', value: 'Lawyer' },
    { label: 'Legal Assistant', value: 'Assistant' },
    { label: 'Law Student', value: 'Student' },
  ];

  const sourceOptions = [
    { label: 'Google Search', value: 'Google' },
    { label: 'LinkedIn', value: 'LinkedIn' },
    { label: 'Referral', value: 'Referral' },
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    country: 'Pakistan',
    profession: '',
    source: '',
    agree: false,
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
          <KeyboardAvoidingView
            style={[styles.keyboardAvoidingView, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          >
            <ScrollView
              contentContainerStyle={[styles.scrollContent, {
                paddingBottom: insets.bottom + 20,
                backgroundColor: colors.background
              }]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={[
                styles.card,
                isDesktop && styles.cardDesktop,
                { backgroundColor: colors.background }
              ]}>
                <Text style={[styles.title, { color: colors.text }]}>Create your account</Text>
                <Text style={[styles.subtitle, {
                  color: colors.text,
                  opacity: 0.8
                }]}>
                  Welcome, Advocate — let's get you set up.
                </Text>

                {/* First + Last Name Row */}
                <View style={styles.row}>
                  <View style={styles.halfInputWrapper}>
                    <Text style={[styles.label, { color: colors.text }]}>First Name<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.firstName && touched.firstName ? colors.error : colors.border
                      }
                    ]}>
                      <Text style={styles.icon}>👤</Text>
                      <TextInput
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        placeholder="John"
                        style={[styles.inputStyle, { color: colors.text, backgroundColor: 'transparent' }]}
                        placeholderTextColor={colors.secondary}
                      />
                    </View>
                    {errors.firstName && touched.firstName && (
                      <Text style={[styles.errorText, { color: colors.error }]}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View style={styles.halfInputWrapper}>
                    <Text style={[styles.label, { color: colors.text }]}>Last Name<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.lastName && touched.lastName ? colors.error : colors.border
                      }
                    ]}>
                      <Text style={styles.icon}>👤</Text>
                      <TextInput
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        placeholder="Advocate"
                        style={[styles.inputStyle, { color: colors.text, backgroundColor: 'transparent' }]}
                        placeholderTextColor={colors.secondary}
                      />
                    </View>
                    {errors.lastName && touched.lastName && (
                      <Text style={[styles.errorText, { color: colors.error }]}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>

                {/* Email and Phone Number Row */}
                <View style={styles.row}>
                  {/* Email */}
                  <View style={[styles.halfInputWrapper, { marginRight: 8 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>Email<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.email && touched.email ? colors.error : colors.border
                      }
                    ]}>
                      <Text style={[styles.icon, { color: colors.primary }]}>✉️</Text>
                      <TextInput
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder="advocate@legalassist.pro"
                        placeholderTextColor={colors.secondary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={[styles.textInput, { color: colors.text, backgroundColor: 'transparent' }]}
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text style={[styles.errorText, { color: colors.error }]}>{errors.email}</Text>
                    )}
                  </View>

                  {/* Phone Number */}
                  <View style={[styles.halfInputWrapper, { marginLeft: 8 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>Phone Number<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.phone && touched.phone ? colors.error : colors.border
                      }
                    ]}>
                      <Text style={[styles.icon, { color: colors.primary }]}>📱</Text>
                      <TextInput
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        placeholder="+92 300 1234567"
                        placeholderTextColor={colors.secondary}
                        keyboardType="phone-pad"
                        style={[styles.textInput, { color: colors.text, backgroundColor: 'transparent' }]}
                      />
                    </View>
                    {errors.phone && touched.phone && (
                      <Text style={[styles.errorText, { color: colors.error }]}>{errors.phone}</Text>
                    )}
                  </View>
                </View>

                {/* Username and Password Row */}
                <View style={styles.row}>
                  {/* Username */}
                  <View style={[styles.halfInputWrapper, { marginRight: 8 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>Username<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.username && touched.username ? colors.error : colors.border
                      }
                    ]}>
                      <Text style={[styles.icon, { color: colors.primary }]}>👤</Text>
                      <TextInput
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        placeholder="john_advocate"
                        placeholderTextColor={colors.secondary}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[styles.textInput, { color: colors.text, backgroundColor: 'transparent' }]}
                      />
                    </View>
                    {errors.username && touched.username && (
                      <Text style={[styles.errorText, { color: colors.error }]}>{errors.username}</Text>
                    )}
                  </View>

                  {/* Password */}
                  <View style={[styles.halfInputWrapper, { marginLeft: 8 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>Password<Text style={styles.required}>*</Text></Text>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.password && touched.password ? colors.error : colors.border
                      }
                    ]}>
                      <Text style={[styles.icon, { color: colors.primary }]}>🔒</Text>
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="••••••••"
                        placeholderTextColor={colors.secondary}
                        secureTextEntry={secure}
                        style={[styles.textInput, { color: colors.text, backgroundColor: 'transparent' }]}
                      />
                      <TouchableOpacity
                        onPress={() => setSecure(!secure)}
                        style={{
                          padding: 8,
                          marginRight: -8
                        }}
                      >
                        <Text style={{ color: colors.primary }}>{secure ? '👁️' : '👁️‍🗨️'}</Text>
                      </TouchableOpacity>
                    </View>
                    {errors.password && touched.password && (
                      <Text style={[styles.errorText, { color: colors.error }]}>{errors.password}</Text>
                    )}
                  </View>
                </View>

                {/* Country Dropdown */}
                <CustomPicker
                  label="Country"
                  selectedValue={values.country}
                  onValueChange={v => setFieldValue('country', v)}
                  items={countryOptions}
                  placeholder="Select country"
                />
                {errors.country && touched.country && (
                  <Text style={[styles.errorText, { marginTop: -8, marginBottom: 8,color: colors.error  }]}>{errors.country}</Text>
                )}

                {/* Profession Dropdown */}
                <CustomPicker
                  label="Your Profession"
                  selectedValue={values.profession}
                  onValueChange={v => setFieldValue('profession', v)}
                  items={professionOptions}
                  placeholder="Select your profession"
                />
                {errors.profession && touched.profession && (
                  <Text style={[styles.errorText, { marginTop: -8, marginBottom: 8 ,color: colors.error  }]}>{errors.profession}</Text>
                )}

                {/* Source Dropdown */}
                <CustomPicker
                  label="Where did you hear about us?"
                  selectedValue={values.source}
                  onValueChange={v => setFieldValue('source', v)}
                  items={sourceOptions}
                  placeholder="Select an option"
                />

                {/* Terms Agreement (Custom Circular Checkbox) */}
                <TouchableOpacity
                  style={styles.termsContainer}
                  activeOpacity={0.8}
                  onPress={() => setFieldValue('agree', !values.agree)}
                >
                  <View style={[
                    styles.circularCheckbox,
                    values.agree && styles.circularCheckboxChecked,
                    errors.agree && touched.agree && styles.checkboxError
                  ]}>
                    {values.agree && <Text style={styles.checkIcon}>✓</Text>}
                  </View>
                  <Text style={styles.termsText}>
                    I agree to the <Text style={styles.link}>Privacy Policy</Text> & <Text style={styles.link}>Terms</Text>.<Text style={styles.required}>*</Text>
                  </Text>
                </TouchableOpacity>
                {errors.agree && touched.agree && (
                  <Text style={[styles.errorText, { marginTop: -12, marginBottom: 8 }]}>{errors.agree}</Text>
                )}

                {/* Submit Button */}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    { backgroundColor: colors.primary },
                    (isSubmitting || Object.keys(errors).length > 0) && styles.submitButtonDisabled
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={[styles.submitButtonText, { color: '#FFFFFF' }]}>
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>

                {/* Social Authentication Buttons */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: '#FFFFFF' }]}
                    activeOpacity={0.7}
                    onPress={() => console.log('Google')}
                  >
                    <View style={[styles.iconWrapper, { backgroundColor: 'white' }]}>
                      <Text style={[styles.socialIconText, { color: '#4285F4', fontSize: 16, fontWeight: 'bold' }]}>G</Text>
                    </View>
                    <Text style={[styles.socialButtonText, { color: '#1F2937' }]}>Continue with Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: '#FFFFFF' }]}
                    activeOpacity={0.7}
                    onPress={() => console.log('Facebook')}
                  >
                    <View style={[styles.iconWrapper, { backgroundColor: '#1877F2' }]}>
                      <Text style={[styles.socialIconText, { color: 'white', fontSize: 16, fontWeight: 'bold' }]}>f</Text>
                    </View>
                    <Text style={[styles.socialButtonText, { color: '#212121ff' }]}>Continue with Facebook</Text>
                  </TouchableOpacity>
                </View>

                {/* Login Link */}
                <View style={[styles.footer, { borderTopColor: colors.border }]}>
                  <Text style={[styles.footerText, { color: colors.text }]}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.footerLink, { color: colors.primary }]}>Sign in instead</Text>
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
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 32,
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfInputWrapper: {
    width: '48%',

  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
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
    paddingVertical: 0,
    color: '#000000', // Default text color, will be overridden by style prop
  },
  dropdownIcon: {
    marginLeft: 8,
    fontSize: 10,
    opacity: 0.7,
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
    width: '100%'
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    borderWidth: 0,
    textAlign: 'left',
    height: '100%',
    paddingVertical: 0
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  hint: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 6,
    marginLeft: 2,
  },
  dropdownIcon: {
    fontSize: 10,
    marginLeft: 8,
    transform: [{ scaleY: 0.8 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '60%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 10,
  },
  pickerButton: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  picker: {
    width: '100%',
    fontSize: 14,
    color: '#374151',
    textAlign: 'left',
  },
  pickerItem: {
    textAlign: 'left',
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
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
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  link: {
    color: '#12B7A6',
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#12B7A6',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  footerLink: {
    fontSize: 14,
    color: '#12B7A6',
    fontWeight: '700',
  },
  socialButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2d2d2d',
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 16,
  },
  socialButtonText: {
    color: '#080808ff',
    fontSize: 16,
    fontWeight: '500',
  },
  socialContainer: {
    marginTop: 24,
    width: '100%',
    marginTop: 24,
    marginBottom: 16,
  },
  socialButton: {
    width: '100%',
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
    fontSize: 16,
    fontWeight: '600',
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
  socialIconText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  footerButton: {
    marginTop: 40,
    padding: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
});

export default SignUpScreen;
