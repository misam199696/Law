import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeToggle } from '../hooks/useThemeToggle';

export const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'app_theme';

export const ThemeProvider = ({ children }) => {
  const { isDarkMode, toggleTheme, isLoading } = useThemeToggle();

  // Theme colors
  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#121212' : '#FFFFFF',
      card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      border: isDarkMode ? '#333333' : '#E5E7EB',
      primary: '#12B7A6',
      primaryDark: '#0E8C7F',
      secondary: isDarkMode ? '#9CA3AF' : '#6B7280',
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
  };

  if (isLoading) {
    return null; // or a loading indicator
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
