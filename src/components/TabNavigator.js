import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

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
  const { colors } = useTheme();
  
  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <View style={styles.container}>
      <Header 
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;

          switch (route.name) {
            case 'Home':
              IconComponent = Home;
              break;
            case 'Tools':
              IconComponent = Tools;
              break;
            case 'Library':
              IconComponent = Book;
              break;
            case 'Voice':
              IconComponent = Voice;
              break;
            case 'Documents':
              IconComponent = Documents;
              break;
            case 'Settings':
              IconComponent = Settings;
              break;
            default:
              IconComponent = Home;
          }

          return <IconComponent width={size} height={size} stroke={color} strokeWidth={1.5} fill="none" color={color} />;
        },
        tabBarActiveTintColor: '#11B7B1', // Active icon color - matching brand color
        tabBarInactiveTintColor: '#9CA3AF', // Inactive icon color - gray
        tabBarStyle: {
          backgroundColor: '#1F2937', // Dark background color matching Figma
          borderTopWidth: 0, // Remove top border
          height: 80,
          paddingBottom: 5,
          paddingTop: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
        },
        headerShown: false,
      })}
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
