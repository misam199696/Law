import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import CustomTabBar from './CustomTabBar';

// Import SVG icons
import Home from '../assets/svg/home';
import Tools from '../assets/svg/judgments';
import Book from '../assets/svg/book';
import Voice from '../assets/svg/voice';
import Documents from '../assets/svg/Drafting';
import Settings from '../assets/svg/contract';

import HomeScreen from '../screens/HomeScreen';
import ToolsScreen from '../screens/ToolsScreen';
import LibraryScreen from '../screens/LibraryScreen';
import VoiceScreen from '../screens/VoiceScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { isDarkMode, colors } = useTheme();
  const navigation = useNavigation();
  
  const handleNotificationPress = useCallback(() => {
    console.log('Notification pressed');
  }, []);

  const handleProfilePress = useCallback(() => {
    navigation.navigate('ProfileSettings');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header 
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ tabBarLabel: '' }}
        />
        <Tab.Screen 
          name="Tools" 
          component={ToolsScreen}
          options={{ tabBarLabel: '' }}
        />
        <Tab.Screen 
          name="Library" 
          component={LibraryScreen}
          options={{ tabBarLabel: '' }}
        />
        <Tab.Screen 
          name="Voice" 
          component={VoiceScreen}
          options={{ tabBarLabel: '' }}
        />
        <Tab.Screen 
          name="Documents" 
          component={DocumentsScreen}
          options={{ tabBarLabel: '' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ tabBarLabel: '' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Let theme handle background
  },
});

export default TabNavigator;
