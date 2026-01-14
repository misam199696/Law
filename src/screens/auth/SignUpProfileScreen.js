
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
            style={[styles.picker, {
              backgroundColor: colors.background,
            }]}
            dropdownIconColor={colors.primary}
            dropdownIconRippleColor={colors.primary}
            itemStyle={[styles.pickerItem, {
              color: colors.text,
              backgroundColor: colors.background,
              fontSize: 16,
              height: 50,
            }]}
            themeVariant={isDark ? 'dark' : 'light'}
          >
            <Picker.Item
              label={placeholder || 'Select an option...'}
              value=""
              color={colors.text}
              style={{
                backgroundColor: colors.background,
                fontSize: 16,
                opacity: 0.7,
              }}
            />
            {items.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.label}
                value={item.value}
                color={item.value === selectedValue ? colors.primary : colors.text}
                style={{
                  backgroundColor: isDark ? colors.card : colors.background,
                  color: item.value === selectedValue ? colors.primary : colors.text,
                  padding: 15,
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </Picker>
        </View>
      </Modal>
    </View>
  );
};

const SignUpProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [secure, setSecure] = useState(true);
  const isDesktop = width > 600;
  const isRTL = i18n.language === 'ur';

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
    cnic: Yup.string()
      .required(t('form.errors.required'))
      .matches(/^[0-9]{5}-[0-9]{7}-[0-9]$|^[A-Za-z]-\d{4}-\d{4}$/, 'Invalid CNIC or Bar Council format'),
    country: Yup.string()
      .required(t('form.errors.required')),
    city: Yup.string()
      .required(t('form.errors.required')),
    province: Yup.string()
      .required(t('form.errors.required')),
    profession: Yup.string()
      .required(t('form.errors.required')),
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
    country: '',
    city: '',
    province: '',
    profession: '',
    source: '',
    agree: false,
  });

  const insets = useSafeAreaInsets();

  // Add language selector UI similar to LoginScreen
  const renderLanguageSelector = () => (
    <View style={[styles.languageContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      <TouchableOpacity
        onPress={() => handleLanguageChange('en')}
        style={[
          styles.languageButton,
          currentLanguage === 'en' && styles.activeLanguageButton,
          { marginRight: isRTL ? 0 : 10, marginLeft: isRTL ? 10 : 0 }
        ]}
      >
        <Text style={[
          styles.languageText,
          currentLanguage === 'en' && styles.activeLanguageText,
          { color: colors.text }
        ]}>
          EN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLanguageChange('ur')}
        style={[
          styles.languageButton,
          currentLanguage === 'ur' && styles.activeLanguageButton
        ]}
      >
        <Text style={[
          styles.languageText,
          currentLanguage === 'ur' && styles.activeLanguageText,
          { color: colors.text }
        ]}>
          اردو
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Add language selector at the top */}
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }} />
        {renderLanguageSelector()}
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
                  }]}>{t('signup.title')}</Text>
                  <Text style={[styles.subtitle, {
                    color: colors.text,
                    opacity: 0.8,
                    textAlign: currentLanguage === 'en' ? 'left' : 'left',
                    width: '100%',
                    writingDirection: currentLanguage === 'en' ? 'ltr' : 'rtl'
                  }]}>
                    {t('signup.subtitle')}
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

                  {/* CNIC / Bar Council */}
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
                      {/* <Text style={[styles.icon, { color: colors.primary }]}>🆔</Text> */}
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

                    {/* Province Picker */}
                  <View style={[styles.professionInputGroup, { backgroundColor: colors.background }]}>
                       <Text style={[styles.professionLabel, { color: colors.text }]}>{t('province')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                    
                        <CustomPicker
                          selectedValue={values.province}
                          onValueChange={v => setFieldValue('province', v)}
                          items={provinceOptions}
                          placeholder="Select province"
                        />
                      </View>
                      {errors.province && touched.province && (
                        <Text style={[styles.errorText, { color: colors.error }]}>{errors.province}</Text>
                      )}
                  


                {/* Profession Dropdown */}
                <View style={[styles.professionInputGroup, { backgroundColor: colors.background }]}>
                  <Text style={[styles.professionLabel, { color: colors.text }]}>{t('selectProfession')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                  <CustomPicker
                    selectedValue={values.profession}
                    onValueChange={v => setFieldValue('profession', v)}
                    items={professionOptions}
                    placeholder="Select your profession"
                  />
                  {errors.profession && touched.profession && (
                    <Text style={[styles.errorText, { color: colors.error }]}>{errors.profession}</Text>
                  )}
                </View>

                {/* Source Dropdown */}
                <View style={styles.sourceInputGroup}>
                  <Text style={[styles.sourceLabel, { color: colors.text }]}>{t('selectSource')}<Text style={[styles.required, { color: colors.error }]}>*</Text></Text>
                  <CustomPicker
                    selectedValue={values.source}
                    onValueChange={v => setFieldValue('source', v)}
                    items={sourceOptions}
                    placeholder="Select an option"
                    customStyles={styles.sourcePicker}
                  />
                  {errors.source && touched.source && (
                    <Text style={[styles.errorText, { color: colors.error }]}>{errors.source}</Text>
                  )}
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
    width: '100%',
  },
  label: {
    fontSize: 14,
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
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    marginTop: 5,

  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    color: '#60A5FA',
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
    maxHeight: '60%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'transparent',
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
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  // Profession Dropdown Styles
  professionInputGroup: {
    marginBottom: -10,
    width: '100%',
    borderRadius: 8,
    marginTop:10
    // padding: 5,
    // borderLeftWidth: 3,
  },
  professionLabel: {
    fontSize: 14,
    // fontWeight: '600',
    marginBottom: -10,
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
    marginBottom: -10,
    width: '100%',
    borderRadius: 8,
    padding: 5,
  },
  sourceLabel: {
    fontSize: 14,
    // fontWeight: '600',
    marginBottom: -10,
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
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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


  label: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 0,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    color: '#F3F4F6',
    paddingVertical: 8,
    height: '100%',
    paddingLeft: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
});

export default SignUpProfileScreen;
