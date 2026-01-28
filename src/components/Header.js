import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomModalMenu from './CustomModalMenu';
import MenuButton from '../assets/svg/menuButton';
import { useTheme } from '../context/ThemeContext';
import BellIcon from '../assets/svg/bellIcon';

const Header = ({ onMenuPress, onNotificationPress, onProfilePress }) => {
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('overview');

  const handleMenuPress = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleDropdownClose = () => {
    setIsDropdownVisible(false);
  };

  const handleDropdownSelect = (item) => {
    console.log('Selected:', item);
    setActiveMenuItem(item.id); // Update the active menu item
    setIsDropdownVisible(false); // Close dropdown after selection
    // Handle navigation or action based on selected item
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isDarkMode ? '#2B2B31' : '#FFFFFF',
        borderBottomColor: isDarkMode ? '#1f1f1fff' : '#E5E7EB',
        borderBottomWidth: 1,
        paddingTop: insets.top + 10,
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
      }
    ]}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <MenuButton width={30} height={30} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>LA</Text>
        </View>
      </View>

      <View style={styles.centerSection}>
        <Text style={[styles.greeting, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Good Morning, Advocate</Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>Welcome back to your dashboard</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
          <BellIcon width={24} height={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onProfilePress} style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://picsum.photos/seed/user-avatar/40/40.jpg' }} 
            style={styles.profileImage} 
          />
          <Icon name="keyboard-arrow-down" size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
      </View>
      
      <CustomModalMenu
        isVisible={isDropdownVisible}
        onClose={handleDropdownClose}
        onSelect={handleDropdownSelect}
        activeId={activeMenuItem}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    paddingBottom: 20,
    minHeight: 90,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    marginRight: 16,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14B8A6',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerSection: {
    flex: 2,
    alignItems: 'flex-start',
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 12,
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: 6,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  notificationButton: {
    marginRight: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginRight: 6,
  },
});

export default Header;
