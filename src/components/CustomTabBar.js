import React, { useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

// Import SVG icons
import Home from '../assets/svg/home';
import Tools from '../assets/svg/judgments';
import Book from '../assets/svg/book';
import Voice from '../assets/svg/voice';
import Documents from '../assets/svg/Drafting';
import Settings from '../assets/svg/contract';
import MenuButton from '../assets/svg/menuButton';
import MoreTabbes from '../assets/svg/moreTabbes';
import MoreGrey from '../assets/svg/more';

// Memoized Icon Component
const TabIcon = React.memo(({ icon: IconComponent, isFocused, colors, isDarkMode, width = 24, height = 24 }) => {
  const iconColor = isFocused ? colors.primary : (isDarkMode ? '#FFFFFF' : '#9CA3AF');
  console.log('TabIcon render - isFocused:', isFocused, 'color:', iconColor);
  
  return (
    <IconComponent 
      width={width} 
      height={height} 
      stroke={iconColor}
      strokeWidth={1.5} 
    />
  );
});

TabIcon.displayName = 'TabIcon';


const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const expandAnimation = useRef(new Animated.Value(0)).current;

  const mainTabs = useMemo(() => [
    { name: 'Home', icon: Home, screen: 'Home' },
    { name: 'Tools', icon: Tools, screen: 'Tools' },
    { name: 'Library', icon: Book, screen: 'Library' },
  ], []);

  const moreTabs = useMemo(() => [
    { name: 'Voice', icon: Voice, screen: 'Voice' },
    { name: 'Documents', icon: Documents, screen: 'Documents' },
    { name: 'Settings', icon: Settings, screen: 'Settings' },
  ], []);

  const handleMorePress = useCallback(() => {
    const newState = !showMoreOptions;
    setShowMoreOptions(newState);
    console.log('More button pressed, showMoreOptions:', newState);
    
    Animated.timing(expandAnimation, {
      toValue: newState ? 1 : 0,
      duration: 200, // Faster animation
      useNativeDriver: false,
    }).start();
  }, [showMoreOptions, expandAnimation]);

  const handleTabPress = useCallback((screen) => {
    navigation.jumpTo(screen);
    setShowMoreOptions(false); // Hide more options when another tab is pressed
    
    // Also reset animation
    Animated.timing(expandAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [navigation, expandAnimation]);

  const handleMoreTabPress = useCallback((screen) => {
    setShowMoreOptions(false);
    
    Animated.timing(expandAnimation, {
      toValue: 0,
      duration: 150, // Faster closing animation
      useNativeDriver: false,
    }).start();
    
    // Use the jumpTo method for tab navigation
    navigation.jumpTo(screen);
  }, [expandAnimation, navigation]);

  const getCurrentRouteName = useCallback(() => {
    if (state && state.routes && state.routes.length > 0) {
      const currentRoute = state.routes[state.index];
      return currentRoute.name;
    }
    return 'Home';
  }, [state]);

  const currentRouteName = getCurrentRouteName();

  // Animation styles
  const containerHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 300],
  });

  const moreOptionsOpacity = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const moreOptionsTranslateY = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0], // Smaller translate distance for smoother feel
  });

  return (
    <Animated.View style={[styles.container, { 
      backgroundColor: isDarkMode ? '#2B2B31' : '#FFFFFF',
      height: containerHeight 
    }]}>
      {/* More Options - Expanded Section */}
      <Animated.View style={[
        styles.moreOptionsContainer,
        {
          opacity: moreOptionsOpacity,
          transform: [{ translateY: moreOptionsTranslateY }],
        }
      ]}>
        {moreTabs.map((tab) => {
          const isFocused = currentRouteName === tab.screen;
          return (
            <TouchableOpacity
              key={tab.screen}
              style={styles.moreOptionItem}
              onPress={() => handleMoreTabPress(tab.screen)}
              activeOpacity={0.8}
            >
              <TabIcon 
                icon={tab.icon}
                isFocused={isFocused}
                colors={colors}
                isDarkMode={isDarkMode}
              />
              <Text style={[styles.moreOptionText, { color: isFocused ? colors.primary : colors.text }]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* Main Tab Bar */}
      <View style={styles.tabBar}>
        {mainTabs.map((tab) => {
          const isFocused = currentRouteName === tab.screen;
          return (
            <TouchableOpacity
              key={tab.screen}
              style={styles.tabItem}
              onPress={() => handleTabPress(tab.screen)}
              activeOpacity={0.8}
            >
              <TabIcon 
                icon={tab.icon}
                isFocused={isFocused}
                colors={colors}
                isDarkMode={isDarkMode}
              />
            </TouchableOpacity>
          );
        })}
        
        {/* More Button */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={handleMorePress}
          activeOpacity={0.8}
        >
          {showMoreOptions ? (
            <MoreTabbes
              width={30}
              height={30}
            />
          ) : (
            <MoreGrey
              width={30}
              height={30}
            />
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: '5%',
    right: '10%',
    width: '70%',
    height: 60,
    borderRadius: 40,
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 0,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  moreOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240, // 300px total - 60px for main tabs
    paddingTop: 40, // More padding for better spacing
    paddingBottom: 20,
  },
  moreOptionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 0,
  },
  moreOptionText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default CustomTabBar;
