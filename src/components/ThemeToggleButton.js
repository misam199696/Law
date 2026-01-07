import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeToggleButton = ({ style }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={toggleTheme}
      accessibilityLabel={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Icon 
        name={isDarkMode ? 'weather-sunny' : 'weather-night'} 
        size={24} 
        color={isDarkMode ? '#FFD700' : '#000000'} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggleButton;
