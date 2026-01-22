import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'judgments', label: 'Judgments', icon: 'gavel' },
  { id: 'voice-search', label: 'Voice Search', icon: 'mic' },
  { id: 'legal-statutes', label: 'Legal Statutes', icon: 'menu-book' },
  { id: 'petition-drafting', label: 'Petition Drafting', icon: 'description' },
  { id: 'contract-drafting', label: 'Contract Drafting', icon: 'assignment' },
];

const CustomDropdownMenu = ({
  isVisible,
  activeId = 'overview',
  onSelect,
  onClose,
  headerHeight,
}) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Reset values before animating in
      slideAnim.setValue(-300);
      fadeAnim.setValue(0);
      
      // Animate in from left
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Animate out to left
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isVisible]);

  return (
    <>
      {/* Backdrop to detect outside clicks - only show when visible */}
      {isVisible && (
        <TouchableWithoutFeedback 
          style={styles.backdrop}
          onPress={() => {
            // Close menu when clicking outside
            if (onClose) {
              onClose();
            }
          }}
        >
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}
      
      {/* Dropdown menu */}
      <TouchableWithoutFeedback onPress={() => {}}>
        <Animated.View 
          style={[
            styles.dropdown, 
            { 
              top: headerHeight - 10,
              transform: [{ translateX: slideAnim }],
              opacity: fadeAnim,
              display: isVisible ? 'flex' : 'none',
            }
          ]}
        >
      {menuItems.map(item => {
        const isActive = item.id === activeId;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, isActive && styles.activeItem]}
            onPress={() => onSelect(item)}
            activeOpacity={0.8}
          >
            <Icon
              name={item.icon}
              size={20}
              color={isActive ? '#FFFFFF' : '#9CA3AF'}
            />
            <Text style={[styles.text, isActive && styles.activeText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Go Premium */}
      <TouchableOpacity style={styles.premiumBtn} activeOpacity={0.9}>
        <Icon name="auto-awesome" size={18} color="#FFFFFF" />
        <Text style={styles.premiumText}>Go Premium</Text>
      </TouchableOpacity>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CustomDropdownMenu;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  dropdown: {
    position: 'absolute',
    left: 0, // 👈 align with menu button position
    width: 280,
    backgroundColor: '#171616ff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 1000,
    paddingBottom: 20,
    paddingTop: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 6,
    
  },
  activeItem: {
    backgroundColor: '#14B8A6',
  },
  text: {
    marginLeft: 12,
    fontSize: 15,
    color: '#E5E7EB',
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
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 80,
    gap: 6,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
