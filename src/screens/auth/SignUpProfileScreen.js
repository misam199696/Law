
import React, { useState, useEffect } from 'react';
import { I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
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
import CountryPicker from 'react-native-country-picker-modal';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

/**
 * Custom Dropdown Component
 * A reusable dropdown component without external dependencies
 */
const CustomDropdown = ({ label, selectedValue, onValueChange, items, placeholder, error }) => {
  const { colors } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentLanguage } = useLanguage();

  const getDisplayValue = () => {
    const selectedItem = items.find(item => item.value === selectedValue);
    return selectedItem ? selectedItem.label : placeholder;
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.error : colors.border,
            justifyContent: 'space-between',
            paddingRight: getResponsiveValue(10, 11, 12)
          }
        ]}
        onPress={() => setShowDropdown(!showDropdown)}
        activeOpacity={0.8}
      >
        <Text style={[styles.inputStyle, { color: selectedValue ? colors.text : colors.secondary }]}>
          {getDisplayValue()}
        </Text>
        <Text style={[styles.dropdownIcon, { color: colors.text }]}>{showDropdown ? '⌃' : '⌄'}</Text>
      </TouchableOpacity>

      {/* Custom Dropdown List */}
      {showDropdown && (
        <View style={[
          styles.customDropdown,
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.dropdownOption,
                { 
                  backgroundColor: selectedValue === item.value ? colors.lightBlue : 'transparent',
                  borderColor: colors.border
                }
              ]}
              onPress={() => {
                onValueChange(item.value);
                setShowDropdown(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.dropdownOptionText,
                { 
                  color: selectedValue === item.value ? colors.primary : colors.text,
                  textAlign: currentLanguage === 'en' ? 'left' : 'right',
                  writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl'
                }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

/**
 * SignUpScreen Component
 * A comprehensive registration screen for legal advocates with professional profile fields.
 */
const SignUpProfileScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [secure, setSecure] = useState(true);
  const isDesktop = width > 600;
  const isTablet = width > 768;
  const isRTL = i18n.language === 'ur';
  const { accountType } = route.params || {};

  // Get title based on account type
  const getAccountTitle = () => {
    switch (accountType) {
      case 'public':
        return t('signup.publicUserTitle');
      case 'individual':
        return t('signup.individualUserTitle');
      case 'lawFirm':
        return t('signup.lawFirmTitle');
      default:
        return t('signup.title');
    }
  };

  // Get subtitle based on account type
  const getAccountSubtitle = () => {
    switch (accountType) {
      case 'public':
        return t('signup.publicUserSubtitle');
      case 'individual':
        return t('signup.individualUserSubtitle');
      case 'lawFirm':
        return t('signup.lawFirmSubtitle');
      default:
        return t('signup.subtitle');
    }
  };

  // Load saved language on component mount
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

  const handleLanguageChange = async (language) => {
    try {
      await AsyncStorage.setItem('userLanguage', language);
      changeLanguage(language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Set RTL direction when language changes
  useEffect(() => {
    I18nManager.forceRTL(isRTL);
    // On Android, we need to restart the app for RTL changes to take effect
    if (Platform.OS === 'android') {
      // You might want to show a message to the user to restart the app
      console.log('Please restart the app to apply RTL changes');
    }
  }, [isRTL]);
  const [countryCode, setCountryCode] = useState('PK');
  const [country, setCountry] = useState({
    cca2: 'PK',
    name: 'Pakistan',
    callingCode: '92',
    region: 'Asia',
    subregion: 'Southern Asia',
    flag: 'flag-pk',
    currency: ['PKR']
  });
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onSelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setCountryCode(selectedCountry.cca2);
  };

  // Validation Schema with translations
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('form.errors.required'))
      .min(2, t('form.errors.minLength', { min: 2 })),
    lastName: Yup.string()
      .required(t('form.errors.required'))
      .min(2, t('form.errors.minLength', { min: 2 })),
    phone: Yup.string()
      .required(t('form.errors.required'))
      .matches(/^[0-9+\-\s()]*$/, t('form.errors.invalidPhone')),
    cnic: Yup.string().test(
      'cnic-required',
      t('form.errors.required'),
      function(value) {
        const { accountType } = this.parent;
        if (accountType !== 'public') {
          return value && value.trim() !== '';
        }
        return true; // Optional for public users
      }
    ).matches(
      /^[0-9]{5}-[0-9]{7}-[0-9]$|^[A-Za-z]-\d{4}-\d{4}$/,
      'Invalid CNIC or Bar Council format'
    ),
    country: Yup.string()
      .required(t('form.errors.required')),
    city: Yup.string()
      .required(t('form.errors.required')),
    province: Yup.string()
      .required(t('form.errors.required')),
    profession: Yup.string().test(
      'profession-required',
      t('form.errors.required'),
      function(value) {
        const { accountType } = this.parent;
        if (accountType === 'lawFirm' || accountType === 'public') {
          return value && value.trim() !== '';
        }
        return true; // Optional for individual users
      }
    ),
    source: Yup.string()
      .required(t('form.errors.required')),
    agree: Yup.boolean()
      .oneOf([true], t('form.errors.required'))
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

  // Country picker configuration
  const countryPickerProps = {
    withFilter: true,
    withFlag: true,
    withCountryNameButton: false,
    countryCode: countryCode,
    preferredCountries: ['PK'], // Only PK in preferred to keep it at top
    // Remove countryCodes to show all countries
    withCallingCode: true,
    withEmoji: true,
    withAlphaFilter: true,
    withFlagButton: false,
    withCurrency: true,
    // Remove countryCodes to show all countries
    // This will show all available countries while keeping PK at the top
    containerButtonStyle: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    theme: {
      primaryColor: colors.primary,
      primaryColorVariant: colors.primary,
      backgroundColor: colors.background,
      onBackgroundTextColor: colors.text,
      filterPlaceholderTextColor: colors.text,
      letterSpacing: 0,
      fontFamily: 'System',
    },
  };

  // Use translations for options
  const professionOptions = [
    { label: t('profession.lawyer'), value: 'Lawyer' },
    { label: t('profession.assistant'), value: 'Assistant' },
    { label: t('profession.student'), value: 'Student' },
  ];

  const sourceOptions = [
    { label: t('source.google'), value: 'Google' },
    { label: t('source.linkedin'), value: 'LinkedIn' },
    { label: t('source.referral'), value: 'Referral' },
  ];

  const provinceOptions = [
    { label: t('province.punjab'), value: 'Punjab' },
    { label: t('province.sindh'), value: 'Sindh' },
    { label: t('province.kpk'), value: 'KPK' },
    { label: t('province.balochistan'), value: 'Balochistan' },
    { label: t('province.ict'), value: 'ICT' },
    { label: t('province.gb'), value: 'GB' },
    { label: t('province.ajk'), value: 'AJK' },
  ];

  const [initialValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    cnic: '',
    country: 'Pakistan', // Set Pakistan as default country
    city: '',
    province: '',
    profession: '',
    source: '',
    agree: false,
    accountType: accountType, // Add accountType to form values
  });

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Add language selector at the top */}
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }} />
       
      </View>
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
                isTablet && styles.cardTablet,
                {
                  backgroundColor: colors.background,
                  alignItems: currentLanguage === 'en' ? 'flex-start' : 'flex-end'
                }
              ]}>
                <View style={{
                  width: '100%',
                  alignItems: currentLanguage === 'en' ? 'flex-start' : 'flex-end'
                }}>
                  <Text style={[styles.title, {
                    color: colors.text,
                    textAlign: currentLanguage === 'en' ? 'left' : 'left',
                    width: '100%',
                    writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl'
                  }]}>{getAccountTitle()}</Text>
                  <Text style={[styles.subtitle, {
                    color: colors.text,
                    opacity: 0.8,
                    textAlign: currentLanguage === 'en' ? 'left' : 'left',
                    width: '100%',
                    writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl'
                  }]}>
                    {getAccountSubtitle()}
                  </Text>
                </View>

                {/* First + Last Name Row */}
                <View style={styles.row}>
                  <View style={[styles.halfInputWrapper, { marginRight: 16 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>{t('form.firstName')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
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
                    <Text style={[styles.label, { color: colors.text }]}>{t('form.lastName')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
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

                {/* Phone Number and CNIC Row */}
                <View style={styles.row}>
                  {/* Phone Number */}
                  <View style={[styles.halfInputWrapper, { marginRight: 8 }]}>
                    <Text style={[styles.label, { color: colors.text }]}>{t('form.phoneNumber')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
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
                        style={[styles.textInput, {
                          color: colors.text, backgroundColor: 'transparent', fontSize: 12,
                          width: '80%',
                        }]}
                      />
                    </View>
                    {errors.phone && touched.phone && (
                      <Text style={[styles.errorText, { color: colors.error }]}>{errors.phone}</Text>
                    )}
                  </View>

                  {/* CNIC / Bar Council - Only show for non-public users */}
                  {accountType !== 'public' && (
                    <View style={[styles.halfInputWrapper, { marginLeft: 8 }]}>
                      <Text style={[styles.label, { color: colors.text }]}>
                        CNIC / Bar Council
                        <Text style={[styles.required, { color: colors.error }]}>*</Text>
                      </Text>
                      <View style={[
                        styles.inputContainer,
                        {
                          backgroundColor: colors.card,
                          borderColor: errors.cnic && touched.cnic ? colors.error : colors.border
                        }
                      ]}>
                        <TextInput
                          value={values.cnic}
                          onChangeText={handleChange('cnic')}
                          onBlur={handleBlur('cnic')}
                          placeholder="1234578900"
                          placeholderTextColor={colors.secondary}
                          keyboardType="default"
                          autoCapitalize="characters"
                          style={[styles.textInput, {
                            color: colors.text,
                            backgroundColor: 'transparent',
                            fontSize: 12,
                            width: '80%',
                          }]}
                        />
                      </View>
                      {errors.cnic && touched.cnic && (
                        <Text style={[styles.errorText, { color: colors.error }]}>{errors.cnic}</Text>
                      )}
                    </View>
                  )}
                </View>


                {/* Country Picker */}
                <View style={[styles.inputGroup, { marginTop: 10 }]}>
                  <Text style={[styles.label, { color: colors.text }]}>{t('country')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                  <TouchableOpacity
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.country && touched.country ? colors.error : colors.border,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: 15
                      }
                    ]}
                    onPress={() => setCountryPickerVisible(true)}
                  >
                    <Text style={[styles.inputStyle, { color: values.country ? colors.text : colors.secondary }]}>
                      {values.country || 'Select your country'}
                    </Text>
                    <Text style={{ color: colors.text }}>▼</Text>
                  </TouchableOpacity>
                  {errors.country && touched.country && (
                    <Text style={[styles.errorText, { color: colors.error }]}>{errors.country}</Text>
                  )}
                  <CountryPicker
                    {...countryPickerProps}
                    countryCode={countryCode}
                    visible={countryPickerVisible}
                    onClose={() => setCountryPickerVisible(false)}
                    onSelect={(selectedCountry) => {
                      setFieldValue('country', selectedCountry.name);
                      onSelect(selectedCountry);
                      setCountryPickerVisible(false);
                    }}
                  />
                </View>

                {/* City and Province Row */}
                    {/* City Input */}
                    <View style={{ width: '100%' }}>
                      <Text style={[styles.label, { color: colors.text }]}>{t('city')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                      <View style={[
                        styles.inputContainer,
                        {
                          backgroundColor: colors.card,
                          borderColor: errors.city && touched.city ? colors.error : colors.border,
                          // marginRight: 10
                        }
                      ]}>
                        <TextInput
                          value={values.city}
                          onChangeText={handleChange('city')}
                          onBlur={handleBlur('city')}
                          placeholder="Enter city"
                          placeholderTextColor={colors.secondary}
                          style={[styles.textInput, { color: colors.text, backgroundColor: 'transparent' }]}
                        />
                      </View>
                      {errors.city && touched.city && (
                        <Text style={[styles.errorText, { color: colors.error }]}>{errors.city}</Text>
                      )}
                    </View>

                    {/* Province Dropdown */}
                  <View style={[styles.professionInputGroup, { backgroundColor: colors.background }]}>
                    <CustomDropdown
                      label={t('province')}
                      selectedValue={values.province}
                      onValueChange={v => setFieldValue('province', v)}
                      items={provinceOptions}
                      placeholder="Select province"
                      error={errors.province && touched.province ? errors.province : null}
                    />
                  </View>
                  

                {/* Profession Dropdown - Show for lawFirm and public users */}
                {(accountType === 'lawFirm' || accountType === 'public') && (
                  <View style={[styles.professionInputGroup, { backgroundColor: colors.background }]}>
                    <CustomDropdown
                      label={t('selectProfession')}
                      selectedValue={values.profession}
                      onValueChange={v => setFieldValue('profession', v)}
                      items={professionOptions}
                      placeholder="Select your profession"
                      error={errors.profession && touched.profession ? errors.profession : null}
                    />
                  </View>
                )}

                {/* Source Dropdown */}
                <View style={styles.sourceInputGroup}>
                  <CustomDropdown
                    label={t('selectSource')}
                    selectedValue={values.source}
                    onValueChange={v => setFieldValue('source', v)}
                    items={sourceOptions}
                    placeholder="Select an option"
                    error={errors.source && touched.source ? errors.source : null}
                  />
                </View>
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
                    {t('agree')} <Text style={styles.link}>{t('privacyPolicy')}</Text> {changeLanguage === 'en' ? `&` : ''} <Text style={styles.link}>{t('terms')}</Text><Text style={styles.required}>*</Text>
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
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Creating Account...' : t('createAccount')}
                  </Text>
                </TouchableOpacity>



                {/* Login Link */}
                <View style={[styles.footer, { borderTopColor: colors.border }]}>
                  <Text style={[styles.footerText, { color: colors.text }]}>{t('alreadyHaveAccount')} </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.footerLink, { color: colors.primary }]}>{t('signInInstead')}</Text>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeLanguageButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageText: {
    fontSize: 14,
  },
  activeLanguageText: {
    color: '#fff',
    fontWeight: 'bold',
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
    width: getResponsiveValue('93%', '94%', '95%'),
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
    fontSize: getResponsiveValue(16, 17, 18),
    fontWeight: '800',
    color: '#111827',
    marginBottom: getResponsiveValue(3, 4, 4),

  },
  subtitle: {
    fontSize: getResponsiveValue(12, 13, 14),
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: getResponsiveValue(24, 28, 32),
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getResponsiveValue(12, 14, 16),
  },
  halfInputWrapper: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: getResponsiveValue(12, 14, 16),
    width: '100%',
  },
  label: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '500',
    // marginBottom: 10,
    color: '#F3F4F6',
    // width: '100%',
  },
  required: {
    color: '#EF4444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: getResponsiveValue(6, 7, 8),
    height: getResponsiveValue(36, 38, 40),
    paddingHorizontal: getResponsiveValue(10, 11, 12),
    marginTop: 5,

  },
  icon: {
    marginRight: getResponsiveValue(8, 9, 10),
    fontSize: getResponsiveValue(18, 19, 20),
    color: '#60A5FA',
  },
  eyeIcon: {
    position: 'absolute',
    right: getResponsiveValue(10, 11, 12),
    top: getResponsiveValue(10, 11, 12),
  },
  hint: {
    fontSize: getResponsiveValue(8, 9, 10),
    color: '#9CA3AF',
    marginTop: 6,
    marginLeft: 2,
  },
  dropdownIcon: {
    fontSize: getResponsiveValue(8, 9, 10),
    marginLeft: getResponsiveValue(6, 7, 8),
    transform: [{ scaleY: 0.8 }],
  },
  // Custom Dropdown Styles
  customDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: getResponsiveValue(8, 9, 10),
    borderWidth: 1,
    marginTop: getResponsiveValue(4, 5, 6),
    maxHeight: getResponsiveValue(180, 200, 220),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownOption: {
    padding: getResponsiveValue(12, 14, 16),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownOptionText: {
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '500',
  },
  errorText: {
    fontSize: getResponsiveValue(10, 11, 12),
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getResponsiveValue(6, 7, 8),
    marginBottom: getResponsiveValue(20, 22, 24),
  },
  circularCheckbox: {
    width: getResponsiveValue(18, 20, 22),
    height: getResponsiveValue(18, 20, 22),
    borderRadius: getResponsiveValue(9, 10, 11),
    borderWidth: 2,
    borderColor: '#12B7A6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getResponsiveValue(10, 11, 12),
    backgroundColor: '#FFF',
  },
  circularCheckboxChecked: {
    backgroundColor: '#12B7A6',
  },
  termsText: {
    fontSize: getResponsiveValue(10, 11, 12),
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  // Profession Dropdown Styles
  professionInputGroup: {
    marginBottom: getResponsiveValue(-12, -11, -10),
    width: '100%',
    borderRadius: getResponsiveValue(6, 7, 8),
    marginTop: getResponsiveValue(8, 9, 10)
    // padding: 5,
    // borderLeftWidth: 3,
  },
  professionLabel: {
    fontSize: getResponsiveValue(12, 13, 14),
    // fontWeight: '600',
    marginBottom: getResponsiveValue(-12, -11, -10),
    color: '#10B981',
  },
  professionPicker: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 6,
    padding: 5,
  },
  // Source Dropdown Styles
  sourceInputGroup: {
    marginBottom: getResponsiveValue(-12, -11, -10),
    width: '100%',
    borderRadius: getResponsiveValue(6, 7, 8),
    padding: getResponsiveValue(3, 4, 5),
  },
  sourceLabel: {
    fontSize: getResponsiveValue(12, 13, 14),
    // fontWeight: '600',
    marginBottom: getResponsiveValue(-12, -11, -10),
    color: '#6366F1',
  },
  sourcePicker: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 6,
    padding: 0,
  },

  link: {
    color: '#12B7A6',
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#12B7A6',
    borderRadius: getResponsiveValue(10, 11, 12),
    height: getResponsiveValue(48, 50, 52),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getResponsiveValue(14, 15, 16),
    marginBottom: getResponsiveValue(14, 15, 16),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '700',
    letterSpacing: 0.5,
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
    fontSize: getResponsiveValue(12, 13, 14),
    color: '#1F2937',
    fontWeight: '600',
  },
  footerLink: {
    fontSize: getResponsiveValue(12, 13, 14),
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
    borderRadius: getResponsiveValue(12, 13, 14),
    paddingVertical: getResponsiveValue(12, 14, 15),
    marginBottom: 16,
  },
  socialButtonText: {
    color: '#080808ff',
    fontSize: getResponsiveValue(14, 15, 16),
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


  label: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 0,
  },
  inputStyle: {
    flex: 1,
    fontSize: getResponsiveValue(12, 13, 14),
    color: '#F3F4F6',
    paddingVertical: getResponsiveValue(6, 7, 8),
    height: '100%',
    paddingLeft: 4,
  },
  input: {
    height: getResponsiveValue(44, 47, 50),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: getResponsiveValue(8, 9, 10),
    justifyContent: 'center',
    paddingHorizontal: getResponsiveValue(10, 11, 12),
  },
  text: {
    fontSize: getResponsiveValue(14, 15, 16),
    color: '#111827',
  },
});

export default SignUpProfileScreen;
