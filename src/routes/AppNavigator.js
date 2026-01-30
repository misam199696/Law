import React, { useContext } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SignUpProfileScreen from '../screens/auth/SignUpProfileScreen';
import SignupTypeScreen from '../screens/auth/SignupTypeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import SplashScreen from '../screens/SplashScreen';
import SignupCreateAccount from '../screens/auth/SignupCreateAccount';
import ForgetPasswordScreen from '../screens/auth/ForgetPasswordScreen';
import NewCredentialScreen from '../screens/auth/NewCredentialScreen';
import LawFirmProfileScreen from '../screens/auth/LawFirmProfileScreen';
import TabNavigator from '../components/TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isDarkMode, colors } = useTheme();
  
  // Custom theme based on dark/light mode
  const MyTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            color: colors.text,
          },
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen 
          name="SignupType" 
          component={SignupTypeScreen}
          options={{ 
            title: 'Sign Up',
            headerShown: false
          }}
        />
         <Stack.Screen 
          name="SignupCreateAccount" 
          component={SignupCreateAccount}
          options={{ 
            title: 'Sign Up',
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="SignupProfile" 
          component={SignUpProfileScreen}
          options={{ 
            title: 'Create Account',
            headerShown: false,
            headerBackTitle: 'Back'
          }}
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgetPasswordScreen}
          options={{ 
            title: 'Forgot Password',
            headerShown: false,
            headerBackTitle: 'Back'
          }}
        />
        <Stack.Screen 
          name="NewCredential" 
          component={NewCredentialScreen}
          options={{ 
            title: 'New Credentials',
            headerShown: false,
            headerBackTitle: 'Back'
          }}
        />
        <Stack.Screen 
          name="LawFirmProfile" 
          component={LawFirmProfileScreen}
          options={{ 
            title: 'Law Firm Profile',
            headerShown: false,
            headerBackTitle: 'Back'
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Details' }}
        />
        <Stack.Screen 
          name="OTPVerification" 
          component={OTPVerificationScreen}
          options={{ 
            title: 'OTP Verification',
            headerShown: false,
            headerBackTitle: 'Back'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
