import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const ProfileSettingsScreen = ({ navigation }) => {
  const { isDarkMode, colors, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(isDarkMode);
  const insets = useSafeAreaInsets();

  // Sync local state with theme context
  React.useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    toggleTheme();
    setDarkMode(!isDarkMode);
  };

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'ur' : 'en';
    changeLanguage(newLanguage);
  };

  // Dynamic styles
  const dynamicStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: getResponsiveValue(20, 24, 28),
      padding: getResponsiveValue(16, 18, 20),
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: isDarkMode ? 5 : 3,
    },
  });

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + getResponsiveValue(10, 15, 20),
            paddingBottom: insets.bottom + getResponsiveValue(20, 30, 40),
          }
        ]}
      >

        {/* Main Card */}
        <View style={dynamicStyles.card}>

          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://picsum.photos/200' }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.text, textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>Adreson</Text>
              <Text style={[styles.email, { color: colors.secondary, textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>Xipoc@gamil.com</Text>
            </View>
          </View>

          {/* Law Firm Button */}
          <TouchableOpacity style={[styles.pillButton, { borderColor: colors.primary }]}>
            <Icon name="credit-card" size={getResponsiveValue(16, 18, 20)} color={colors.primary} />
            <Text style={[styles.pillText, { color: colors.primary }]}> Law Firm</Text>
          </TouchableOpacity>

          {/* Subscription Card */}
          <View style={styles.subscription}>
            <Icon name="check-circle" size={getResponsiveValue(20, 22, 24)} color="#2EC4B6" />
            <View style={{ marginLeft: getResponsiveValue(8, 10, 12) }}>
              <Text style={[styles.subTitle, { color: '#2EC4B6', textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>Free Trial</Text>
              <Text style={[styles.subDesc, { color: '#2EC4B6', textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>Active Subscription</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Menu Items */}
          <MenuItem icon="settings" label="Profile Settings" />
          <MenuItem icon="feedback" label="Send Feedback" />

          <View style={styles.menuRow}>
            <View style={[styles.menuLeft, { flexDirection: currentLanguage === 'ur' ? 'row-reverse' : 'row' }]}>
              <Icon name="dark-mode" size={getResponsiveValue(20, 22, 24)} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text, textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>Dark Mode</Text>
            </View>
            <Switch 
              value={darkMode} 
              onValueChange={handleThemeToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.text}
              ios_backgroundColor={colors.border}
            />
          </View>

          <View style={styles.menuRow}>
            <View style={[styles.menuLeft, { flexDirection: currentLanguage === 'ur' ? 'row-reverse' : 'row' }]}>
              <Icon name="language" size={getResponsiveValue(20, 22, 24)} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text, textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>
                Language
              </Text>
            </View>
            <Switch 
              value={currentLanguage === 'ur'} 
              onValueChange={handleLanguageToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.text}
              ios_backgroundColor={colors.border}
            />
          </View>

          <MenuItem icon="attach-money" label="Membership Plans" />

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => navigation.replace('Login')}
          >
            <Icon name="logout" size={getResponsiveValue(20, 22, 24)} color="#EF4444" />
            <Text style={[styles.logoutText, { textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>logout</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, label }) => {
  const { colors } = useTheme();
  const { currentLanguage } = useLanguage();
  
  return (
    <TouchableOpacity style={styles.menuRow}>
      <View style={[styles.menuLeft, { flexDirection: currentLanguage === 'ur' ? 'row-reverse' : 'row' }]}>
        <Icon name={icon} size={getResponsiveValue(20, 22, 24)} color={colors.text} />
        <Text style={[styles.menuText, { color: colors.text, textAlign: currentLanguage === 'ur' ? 'right' : 'left', writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr' }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: getResponsiveValue(12, 16, 20),
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveValue(16, 20, 24),
  },
  avatar: {
    width: getResponsiveValue(60, 65, 70),
    height: getResponsiveValue(60, 65, 70),
    borderRadius: getResponsiveValue(30, 32, 35),
    borderWidth: getResponsiveValue(2, 2.5, 3),
    borderColor: '#00B4C6',
    marginRight: getResponsiveValue(12, 14, 16),
  },
  name: {
    fontSize: getResponsiveValue(16, 17, 18),
    fontWeight: '600',
    marginBottom: getResponsiveValue(2, 3, 4),
  },
  email: {
    fontSize: getResponsiveValue(12, 13, 14),
    marginTop: getResponsiveValue(2, 3, 4),
  },

  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: getResponsiveValue(12, 16, 20),
    borderWidth: 1,
    borderRadius: getResponsiveValue(18, 20, 22),
    paddingHorizontal: getResponsiveValue(16, 18, 20),
    paddingVertical: getResponsiveValue(6, 7, 8),
  },
  pillText: {
    fontWeight: '500',
    fontSize: getResponsiveValue(12, 13, 14),
  },

  subscription: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    borderRadius: getResponsiveValue(12, 14, 16),
    padding: getResponsiveValue(14, 16, 18),
    marginTop: getResponsiveValue(16, 20, 24),
    borderWidth: 1,
    borderColor: '#2EC4B6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  subTitle: {
    fontWeight: '600',
    fontSize: getResponsiveValue(12, 13, 14),
    marginBottom: getResponsiveValue(2, 3, 4),
  },
  subDesc: {
    fontSize: getResponsiveValue(11, 12, 13),
  },

  divider: {
    height: 1,
    marginVertical: getResponsiveValue(16, 20, 24),
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getResponsiveValue(12, 14, 16),
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    marginLeft: getResponsiveValue(12, 14, 16),
    fontSize: getResponsiveValue(13, 14, 15),
  },

  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getResponsiveValue(14, 16, 18),
  },
  logoutText: {
    color: '#EF4444',
    marginLeft: getResponsiveValue(10, 12, 14),
    fontSize: getResponsiveValue(13, 14, 15),
  },
});

export default ProfileSettingsScreen;
