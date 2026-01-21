import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../context/LanguageContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const OTPVerificationScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
   const [currentLanguage, setCurrentLanguage] = useState();
  const [isRTL, setIsRTL] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { phoneNumber, isLoginFlow, email } = route.params || {};
  const otpInputs = useRef([]);

  const handleVerifyOTP = () => {
    // TODO: Implement OTP verification logic
    if (isLoginFlow) {
      // Navigate to Home for login flow
      navigation.navigate('Home');
    } else {
      // Navigate to SignupProfile for signup flow
      navigation.navigate('SignupProfile', { accountType: route.params?.accountType });
    }
  };

  const handleResendOTP = () => {
    // TODO: Implement resend OTP logic
  };

  const handleOtpChange = (value, index) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);
    
    // Show error if non-numeric characters were entered
    if (value !== numericValue) {
      setErrorMessage(t('otpVerification.onlyNumbersAllowed'));
    } else {
      setErrorMessage('');
    }
    
    // Auto focus next input if there's a value and not the last input
    if (numericValue && index < 5) {
      // Focus next input
      const nextInput = index + 1;
      otpInputs.current[nextInput]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input on backspace
      otpInputs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');
console.log("currentLanguage//////////",currentLanguage);

  // Auto-navigate when 6 digits are entered
  useEffect(() => {
    if (isOtpComplete) {
      // Add a small delay to show the completed OTP before navigation
      const timer = setTimeout(() => {
        if (isLoginFlow) {
          // Navigate to Home for login flow
          navigation.navigate('Home');
        } else {
          // Navigate to SignupProfile for signup flow
          navigation.navigate('SignupProfile', { accountType: route.params?.accountType });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOtpComplete, navigation, isLoginFlow, route.params?.accountType]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <Text style={[
              styles.title, 
              { 
                color: colors.text,
                textAlign: currentLanguage === 'ur' ? 'right' : 'left',
                alignSelf: currentLanguage === 'ur' ? 'flex-end' : 'flex-start',
                marginLeft: currentLanguage === 'ur' ? 0 : getResponsiveValue(8, 9, 10),
                marginRight: currentLanguage === 'ur' ? getResponsiveValue(8, 9, 10) : 0
              }
            ]}>
              {t('otpVerification.title')}
            </Text>
            <Text style={[
              styles.subtitle, 
              { 
                color: colors.text,
                textAlign: currentLanguage === 'ur' ? 'right' : 'left',
                alignSelf: currentLanguage === 'ur' ? 'flex-end' : 'flex-start',
                marginLeft: currentLanguage === 'ur' ? 0 : getResponsiveValue(8, 9, 10),
                marginRight: currentLanguage === 'ur' ? getResponsiveValue(8, 9, 10) : 0,
                marginBottom: getResponsiveValue(6, 7, 8)
              }
            ]}>
              {t('otpVerification.subtitle')} {phoneNumber || 'your phone number'}
            </Text>
            <Text style={[
              styles.verificationTitle,
              { 
                color: colors.text,
                textAlign: currentLanguage === 'ur' ? 'right' : 'left',
                alignSelf: currentLanguage === 'ur' ? 'flex-end' : 'flex-start',
                marginLeft: currentLanguage === 'ur' ? 0 : getResponsiveValue(8, 9, 10),
                marginRight: currentLanguage === 'ur' ? getResponsiveValue(8, 9, 10) : 0,
                marginBottom: getResponsiveValue(20, 22, 24)
              }
            ]}>
              {t('otpVerification.verificationTitle')}
            </Text>
          
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextInput
                key={index}
                ref={ref => (otpInputs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  { 
                    borderColor: colors.primary,
                    color: colors.text,
                    backgroundColor: colors.card 
                  }
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={otp[index]}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
                secureTextEntry={false}
                autoComplete="off"
                autoCorrect={false}
                spellCheck={false}
              />
            ))}
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={[styles.errorMessage, { color: '#EF4444' }]}>
              {errorMessage}
            </Text>
          ) : null}

          <TouchableOpacity 
            style={[
              styles.verifyButton, 
              { 
                backgroundColor: isOtpComplete ? colors.primary : `${colors.primary}80`,
                opacity: isOtpComplete ? 1 : 0.7
              }
            ]}
            onPress={handleVerifyOTP}
            disabled={!isOtpComplete }
          >
            <Text style={styles.verifyButtonText}>{t('otpVerification.verifyButton')}</Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: colors.text }]}>
              {t('otpVerification.didntReceive')}
            </Text>
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={[styles.resendButton, { color: colors.primary }]}>
                {t('otpVerification.resend')}
              </Text>
            </TouchableOpacity>
          </View>
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
    padding: getResponsiveValue(16, 18, 20),
    paddingTop: getResponsiveValue(60, 70, 80),
  },
  title: {
    fontSize: getResponsiveValue(24, 28, 32),
    fontWeight: '800',
    color: '#111827',
    marginBottom: getResponsiveValue(10, 11, 12),
    letterSpacing: -0.5,
    fontFamily: 'sans-serif-medium',
    marginLeft: getResponsiveValue(8, 9, 10),
  },
  subtitle: {
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '500',
    opacity: 0.8,
    fontFamily: 'sans-serif-medium',
   
  },
  verificationTitle: {
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '700',
    fontFamily: 'sans-serif-medium',
    color: '#111827',
     marginTop: getResponsiveValue(14, 15, 16),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getResponsiveValue(32, 36, 40),
    paddingHorizontal: getResponsiveValue(8, 9, 10),
  },
  otpInput: {
    width: getResponsiveValue(38, 42, 45),
    height: getResponsiveValue(48, 52, 55),
    borderWidth: 1,
    borderRadius: getResponsiveValue(45, 48, 50),
    textAlign: 'center',
    fontSize: getResponsiveValue(18, 20, 22),
    fontWeight: 'bold',
    marginHorizontal: getResponsiveValue(4, 5, 5),
  },
  verifyButton: {
    padding: getResponsiveValue(14, 15, 16),
    borderRadius: getResponsiveValue(6, 7, 8),
    alignItems: 'center',
    marginBottom: getResponsiveValue(16, 18, 20),
  },
  verifyButtonText: {
    color: 'white',
    fontSize: getResponsiveValue(14, 15, 16),
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    marginRight: getResponsiveValue(4, 5, 5),
    fontSize: getResponsiveValue(12, 13, 14),
  },
  resendButton: {
    fontSize: getResponsiveValue(12, 13, 14),
    fontWeight: '600',
  },
  errorMessage: {
    fontSize: getResponsiveValue(12, 13, 14),
    marginBottom: getResponsiveValue(14, 15, 16),
    textAlign: 'center',
  },
});

export default OTPVerificationScreen;
