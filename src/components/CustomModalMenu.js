import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback, Dimensions, SafeAreaView, Platform, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../assets/svg/logo';
import OverView from '../assets/svg/overview';
import Judgment from '../assets/svg/judgments';
import Voice from '../assets/svg/voice';
import Book from '../assets/svg/book';
import Drafting from '../assets/svg/Drafting';
import Contract from '../assets/svg/contract';
import LeftArrow from '../assets/svg/leftArrow';
import LeftArrowBlack from '../assets/svg/leftArrowBlack';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const isSmallScreen = screenWidth <= 375; // iPhone SE and similar small screens
const isMediumScreen = screenWidth > 375 && screenWidth <= 414; // 6-inch and normal screens
const isLargeScreen = screenWidth > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large, iosSmall, iosMedium, iosLarge) => {
  if (Platform.OS === 'ios') {
    if (isSmallScreen) return iosSmall !== undefined ? iosSmall : small;
    if (isMediumScreen) return iosMedium !== undefined ? iosMedium : medium;
    return iosLarge !== undefined ? iosLarge : large;
  } else {
    if (isSmallScreen) return small;
    if (isMediumScreen) return medium;
    return large;
  }
};

const menuItems = [
  { id: 'overview', label: 'Overview', icon: OverView },
  { id: 'judgments', label: 'Judgments', icon: Judgment },
  { id: 'voice-search', label: 'Voice Search', icon: Voice },
  { id: 'legal-statutes', label: 'Legal Statutes', icon: Book },
  { id: 'petition-drafting', label: 'Petition Drafting', icon: Drafting },
  { id: 'contract-drafting', label: 'Contract Drafting', icon: Contract },
];

const CustomModalMenu = ({
  isVisible,
  activeId = 'overview',
  onSelect,
  onClose,
}) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const [showModal, setShowModal] = useState(false);

  const handleLanguageToggle = async (value) => {
    const newLang = value ? 'ur' : 'en';
    await changeLanguage(newLang);
    // Close modal after language change so it opens from left side next time
    onClose();
  };

  useEffect(() => {
    if (isVisible) {
      // Show modal and animate in
      setShowModal(true);
      slideAnim.setValue(-500);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate out first, then hide modal
      Animated.timing(slideAnim, {
        toValue: -500,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Hide modal after animation completes
        setShowModal(false);
      });
    }
  }, [isVisible]);

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <SafeAreaView style={styles.safeArea}>
              <Animated.View 
                style={[
                  styles.menuContainer,
                  {
                    transform: [{ translateX: slideAnim }],
                    backgroundColor: isDarkMode ? '#2B2B31' : '#FFFFFF',
                  }
                ]}
              >
              <View style={styles.menuHeader}>
                <View style={styles.logoContainer}>
                  <View style={styles.logoBackground}>
                    <Logo size={getResponsiveValue(20, 24, 28, 22, 26, 30)} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>LegalAssist</Text>
                    <Text style={[styles.proPlatformText, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>Pro Platform</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  {
                    isDarkMode ? 
                     
                    <LeftArrow size={getResponsiveValue(20, 24, 28, 22, 26, 30)} /> :
                    <LeftArrowBlack size={getResponsiveValue(20, 24, 28, 22, 26, 30)} />
                  }
                </TouchableOpacity>
              </View>

              <View style={styles.menuItems}>
                {menuItems.map(item => {
                  const isActive = item.id === activeId;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.menuItem, isActive && [styles.activeItem, { backgroundColor: isDarkMode ? '#14B8A6' : '#E5F2F1' }]]}
                      onPress={() => {
                        onSelect(item);
                        onClose();
                      }}
                      activeOpacity={0.8}
                    >
                      <item.icon 
                        width={getResponsiveValue(16, 18, 20, 18, 20, 22)} 
                        height={getResponsiveValue(16, 18, 20, 18, 20, 22)} 
                        color={isDarkMode ? '#FFFFFF' : '#000000'}
                        stroke={isDarkMode ? '#FFFFFF' : '#000000'}
                      />
                      <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#374151' }, isActive && { color: isDarkMode ? '#FFFFFF' : '#000000', fontWeight: '600' }]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                {/* Language Toggle */}
                <View style={[styles.toggleContainer,{backgroundColor: isDarkMode ? '#2B2B31' : 'white'}]}>
                  <View style={styles.toggleItem}>
                    <Drafting width={getResponsiveValue(16, 18, 20, 18, 20, 22)} height={getResponsiveValue(16, 18, 20, 18, 20, 22)} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                    <Text style={[styles.toggleText, { color: isDarkMode ? '#FFFFFF' : '#374151' }]}>
                      {currentLanguage === 'ur' ? 'اردو' : 'English'}
                    </Text>
                    <Switch
                      value={currentLanguage === 'ur'}
                      onValueChange={handleLanguageToggle}
                      trackColor={{ false: isDarkMode ? '#374151' : '#D1D5DB', true: '#14B8A6' }}
                      thumbColor={currentLanguage === 'ur' ? '#FFFFFF' : isDarkMode ? '#6B7280' : '#FFFFFF'}
                      ios_backgroundColor={isDarkMode ? '#374151' : '#D1D5DB'}
                    />
                  </View>
                </View>

                {/* Dark Mode Toggle */}
                 <View style={[styles.toggleContainer,{backgroundColor: isDarkMode ? '#2B2B31' : 'white'}]}>
                  <View style={styles.toggleItem}>
                    <Icon name="dark-mode" size={getResponsiveValue(16, 18, 20, 18, 20, 22)} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                    <Text style={[styles.toggleText, { color: isDarkMode ? '#FFFFFF' : '#374151' }]}>Dark Mode</Text>
                    <Switch
                      value={isDarkMode}
                      onValueChange={toggleTheme}
                      trackColor={{ false: isDarkMode ? '#374151' : '#D1D5DB', true: '#14B8A6' }}
                      thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
                      ios_backgroundColor={isDarkMode ? '#374151' : '#D1D5DB'}
                    />
                  </View>
                </View>

                {/* Go Premium */}
                <TouchableOpacity 
                  style={styles.premiumBtn} 
                  activeOpacity={0.9}
                  onPress={() => {
                    // Handle premium action
                    onClose();
                  }}
                >
                  <Icon name="auto-awesome" size={getResponsiveValue(16, 18, 20, 18, 20, 22)} color="#FFFFFF" />
                  <Text style={styles.premiumText}>Go Premium</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModalMenu;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  safeArea: {
    flex: 1,
  },
  menuContainer: {
    width: getResponsiveValue(screenWidth * 0.85, 280, 320, screenWidth * 0.9, 300, 340),
    maxWidth: 270,
    height: '100%',
    backgroundColor: '#171616ff',
    paddingHorizontal: getResponsiveValue(16, 18, 20, 18, 20, 22),
    paddingTop: getResponsiveValue(15, 18, 20, 20, 25, 30),
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    // borderTopLeftRadius: getResponsiveValue(16, 16, 16, 20, 20, 20),
    // borderTopRightRadius: getResponsiveValue(16, 16, 16, 20, 20, 20),
    // borderBottomLeftRadius: getResponsiveValue(16, 16, 16, 0, 0, 0),
    // borderBottomRightRadius: getResponsiveValue(16, 16, 16, 0, 0, 0),
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBackground: {
    width: getResponsiveValue(36, 40, 44, 40, 44, 48),
    height: getResponsiveValue(36, 40, 44, 40, 44, 48),
    borderRadius: getResponsiveValue(6, 8, 10, 8, 10, 12),
    backgroundColor: '#14B8A6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getResponsiveValue(10, 12, 14, 12, 14, 16),
  },
  menuTitle: {
    color: '#FFFFFF',
    fontSize: getResponsiveValue(18, 20, 22, 20, 22, 24),
    fontWeight: '300',
  },
  proPlatformText: {
    color: '#9CA3AF',
    fontSize: getResponsiveValue(10, 12, 14, 12, 14, 16),
    marginTop: 2,
  },
  overviewButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#14B8A6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 35,
  },
  overviewButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 30,
    
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    flex: 1,
    justifyContent: 'center',
    marginTop:20
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getResponsiveValue(8, 10, 12, 12, 14, 16),
    paddingHorizontal: getResponsiveValue(12, 14, 16, 14, 16, 18),
    borderRadius: getResponsiveValue(10, 12, 14, 12, 14, 16),
    marginBottom: getResponsiveValue(6, 8, 10, 8, 10, 12),
  },
  activeItem: {
    backgroundColor: '#14B8A6',
  },
  menuText: {
    fontSize: getResponsiveValue(16, 18, 20, 17, 19, 21),
    color: '#FFFFFF',
    paddingLeft: getResponsiveValue(24, 28, 32, 26, 30, 34),
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  premiumBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14B8A6',
    borderRadius: getResponsiveValue(10, 12, 14, 12, 14, 16),
    paddingVertical: getResponsiveValue(10, 12, 14, 14, 16, 18),
    paddingHorizontal: getResponsiveValue(16, 18, 20, 18, 20, 22),
    marginTop: 'auto',
    marginBottom: getResponsiveValue(16, 18, 20, 20, 24, 28),
    gap: getResponsiveValue(4, 6, 8, 6, 8, 10),
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: getResponsiveValue(14, 15, 16, 15, 16, 17),
    fontWeight: '600',
  },
  toggleContainer: {
    marginBottom: getResponsiveValue(12, 14, 16, 14, 16, 18),
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getResponsiveValue(8, 10, 12, 10, 12, 14),
    paddingHorizontal: getResponsiveValue(12, 14, 16, 14, 16, 18),
    borderRadius: getResponsiveValue(10, 12, 14, 12, 14, 16),
    
  },
  toggleText: {
    flex: 1,
    fontSize: getResponsiveValue(14, 15, 16, 15, 16, 17),
    color: '#FFFFFF',
    marginLeft: getResponsiveValue(12, 14, 16, 14, 16, 18),
  },
});
