import React, { useRef, useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  Platform,
  useColorScheme,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import LawFirmSVG from '../assets/svg/lawFirmSVG';
import PublicUser from '../assets/svg/publicUser';
import IndividualUser from '../assets/svg/individualUser';
import LawFirm from '../assets/svg/lawFirm';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const isSmallScreen = screenWidth <= 375;
const isMediumScreen = screenWidth > 375 && screenWidth <= 414;
const isLargeScreen = screenWidth > 414;

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

const ProfileSelectionModal = ({
  isVisible,
  currentProfile = 'law-firm',
  onSelect,
  onClose,
}) => {
  const { currentLanguage } = useLanguage();
  const { isDarkMode, colors } = useTheme();
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(currentProfile);
  const [showFirmList, setShowFirmList] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);

  // Mock law firms data
  const lawFirms = [
    { id: 1, name: 'ABC Law Associates', description: 'Corporate & Commercial Law' },
    { id: 2, name: 'Legal Eagles Firm', description: 'Family & Property Law' },
    { id: 3, name: 'Justice Advocates', description: 'Criminal & Civil Litigation' },
    { id: 4, name: 'Premier Legal Counsel', description: 'Tax & Regulatory Law' },
    { id: 5, name: 'Global Law Partners', description: 'International Law & Arbitration' },
  ];

  const profileOptions = [
    {
      id: 'public-user',
      name: t('profileSwitch.publicUser'),
      description: t('profileSwitch.publicUserDesc'),
      icon: <PublicUser width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
      iconColor: '#FFA500',
      iconBg: '#FFF5E6'
    },
    {
      id: 'individual-user',
      name: t('profileSwitch.individualUser'),
      description: t('profileSwitch.individualUserDesc'),
      icon: <IndividualUser width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
      iconColor: '#00BFA5',
      iconBg: '#E6F7F5'
    },
    {
      id: 'law-firm',
      name: t('profileSwitch.lawFirm'),
      description: t('profileSwitch.lawFirmDesc'),
      icon: <LawFirm width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
      iconColor: '#FF5252',
      iconBg: '#FFEBEE'
    },
  ];

  useEffect(() => {
    console.log('ProfileSelectionModal useEffect called with isVisible:', isVisible);
    if (isVisible) {
      console.log('Showing modal...');
      setShowModal(true);
      slideAnim.setValue(0);
      scaleAnim.setValue(0.8);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      console.log('Hiding modal...');
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [isVisible]);

  const handleProfileSelect = (profile) => {
    if (profile.id === 'law-firm') {
      setShowFirmList(true);
    } else {
      setSelectedType(profile.id);
      onSelect(profile);
      onClose();
    }
  };

  const handleFirmSelect = (firm) => {
    setSelectedFirm(firm);
    setSelectedType('law-firm');
    onSelect({ ...profileOptions.find(p => p.id === 'law-firm'), selectedFirm: firm });
    setShowFirmList(false);
    onClose();
  };

  const renderProfileIcon = (profile) => {
    return profile.icon;
  };

  // Dynamic styles based on theme
  const dynamicStyles = StyleSheet.create({
    section: {
      backgroundColor: colors.lightBlue,
      borderRadius: getResponsiveValue(16, 18, 20),
      padding: getResponsiveValue(16, 18, 20),
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: getResponsiveValue(16, 18, 20),
      fontWeight: '700',
      color: colors.text,
      marginBottom: getResponsiveValue(6, 7, 8),
    },
    sectionSubtitle: {
      fontSize: getResponsiveValue(12, 13, 14),
      color: colors.secondary,
      marginBottom: getResponsiveValue(16, 18, 20),
      lineHeight: getResponsiveValue(16, 18, 20),
    },
    card: {
      borderRadius: getResponsiveValue(10, 11, 12),
      padding: getResponsiveValue(10, 11, 12),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    cardSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.lightBlue
    },
    cardTitle: {
      fontSize: getResponsiveValue(12, 13, 14),
      fontWeight: '700',
      color: isDarkMode === 'dark' ? '#020202ff' : colors.text,
      marginBottom: getResponsiveValue(3, 4, 4),
    },
    cardDescription: {
      fontSize: getResponsiveValue(10, 11, 12),
      color: isDarkMode === 'dark' ? colors.secondary : colors.secondary,
      lineHeight: getResponsiveValue(16, 18, 20),
    },
    continueButton: {
      height: getResponsiveValue(48, 52, 56),
      borderRadius: getResponsiveValue(10, 11, 12),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
      marginTop: getResponsiveValue(20, 25, 30),
    },
    continueButtonDisabled: {
      backgroundColor: isDarkMode ? '#2D3E4D' : '#56928dff',
      shadowOpacity: 0.5,
    },
    continueButtonText: {
      color: 'white',
      fontSize: getResponsiveValue(14, 15, 16),
      fontWeight: '600',
    },
  });

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      {console.log('Modal rendering with showModal:', showModal)}
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.safeArea}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                opacity: slideAnim,
                transform: [{ scale: scaleAnim }],
                backgroundColor: colors.background,
              },
            ]}
          >
                {/* Account Type Selection */}
                <View style={dynamicStyles.section}>
                    <Text style={[dynamicStyles.sectionTitle, { alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }]}>
                        {t('profileSwitch.switchProfile')}
                    </Text>
                    <Text style={[dynamicStyles.sectionSubtitle, { alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }]}>
                        {t('profileSwitch.chooseProfileType')}
                    </Text>

                    <View style={styles.cardsContainer}>
                        {profileOptions.map((type) => (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    dynamicStyles.card,
                                    selectedType === type.id && dynamicStyles.cardSelected
                                ]}
                                onPress={() => handleProfileSelect(type)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.cardContent, { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }]}>
                                    <View style={[styles.iconContainer, { backgroundColor: type.iconBg }]}>
                                        {renderProfileIcon(type)}
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={[dynamicStyles.cardTitle, { alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }]}>
                                            {type.name}
                                        </Text>
                                        <Text style={[dynamicStyles.cardDescription, { alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end' }]}>
                                            {type.description}
                                        </Text>
                                    </View>
                                    <View style={styles.activeIndicator}>
                                        {selectedType === type.id && (
                                            <View style={[styles.radioButtonSelected, { backgroundColor: colors.primary }]} />
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <TouchableOpacity
                        style={[
                            dynamicStyles.continueButton,
                            !selectedType && dynamicStyles.continueButtonDisabled
                        ]}
                        onPress={onClose}
                        disabled={!selectedType}
                        activeOpacity={0.8}
                    >
                        <Text style={dynamicStyles.continueButtonText}>{t('profileSwitch.switchButton')}</Text>
                    </TouchableOpacity>
                </View>
              </Animated.View>
            </SafeAreaView>
      </View>

      {/* Law Firm Selection Modal */}
      <Modal
        visible={showFirmList}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFirmList(false)}
      >
        <View style={styles.firmBackdrop}>
          <SafeAreaView style={styles.firmSafeArea}>
            <View style={[styles.firmModalContainer, { backgroundColor: colors.background }]}>
              <View style={styles.firmHeader}>
                <Text style={[styles.firmTitle, { color: colors.text }]}>
                  {t('profileSwitch.selectLawFirm', 'Select Law Firm')}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowFirmList(false)}
                >
                  <Icon name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.firmList} showsVerticalScrollIndicator={false}>
                {lawFirms.map((firm) => (
                  <TouchableOpacity
                    key={firm.id}
                    style={[
                      styles.firmItem,
                      selectedFirm?.id === firm.id && { backgroundColor: colors.lightBlue }
                    ]}
                    onPress={() => handleFirmSelect(firm)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.firmItemContent}>
                      <View style={styles.firmNumber}>
                        <Text style={[styles.firmNumberText, { color: colors.primary }]}>
                          {firm.id}
                        </Text>
                      </View>
                      <View style={styles.firmInfo}>
                        <Text style={[styles.firmName, { color: colors.text }]}>
                          {firm.name}
                        </Text>
                        <Text style={[styles.firmDescription, { color: colors.secondary }]}>
                          {firm.description}
                        </Text>
                      </View>
                      {selectedFirm?.id === firm.id && (
                        <Icon name="check-circle" size={24} color={colors.primary} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </Modal>
  );
};

export default ProfileSelectionModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    maxWidth: 500,
    borderRadius: getResponsiveValue(16, 18, 20),
    // padding: getResponsiveValue(10, 12, 14),
    marginHorizontal: getResponsiveValue(10, 12, 15),
  },
  cardsContainer: {
    gap: getResponsiveValue(12, 14, 16),
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: getResponsiveValue(28, 31, 34),
    height: getResponsiveValue(28, 31, 34),
    borderRadius: getResponsiveValue(10, 11, 12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: getResponsiveValue(8, 9, 10),
  },
  activeIndicator: {
    width: getResponsiveValue(18, 20, 22),
    height: getResponsiveValue(18, 20, 22),
    borderRadius: getResponsiveValue(9, 10, 12),
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: getResponsiveValue(10, 11, 12),
    height: getResponsiveValue(10, 11, 12),
    borderRadius: getResponsiveValue(5, 6, 7),
  },
  // Law firm selection styles
  firmBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  firmSafeArea: {
    flex: 1,
  },
  firmModalContainer: {
    flex: 1,
    marginTop: 'auto',
    borderTopLeftRadius: getResponsiveValue(20, 22, 24),
    borderTopRightRadius: getResponsiveValue(20, 22, 24),
    padding: getResponsiveValue(20, 22, 24),
  },
  firmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveValue(20, 22, 24),
  },
  firmTitle: {
    fontSize: getResponsiveValue(20, 22, 24),
    fontWeight: '600',
  },
  closeButton: {
    padding: getResponsiveValue(8, 9, 10),
  },
  firmList: {
    flex: 1,
  },
  firmItem: {
    padding: getResponsiveValue(16, 18, 20),
    marginBottom: getResponsiveValue(12, 14, 16),
    borderRadius: getResponsiveValue(12, 14, 16),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  firmItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firmNumber: {
    width: getResponsiveValue(40, 45, 50),
    height: getResponsiveValue(40, 45, 50),
    borderRadius: getResponsiveValue(20, 22, 25),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getResponsiveValue(16, 18, 20),
  },
  firmNumberText: {
    fontSize: getResponsiveValue(16, 18, 20),
    fontWeight: '700',
  },
  firmInfo: {
    flex: 1,
  },
  firmName: {
    fontSize: getResponsiveValue(16, 18, 20),
    fontWeight: '600',
    marginBottom: getResponsiveValue(4, 5, 6),
  },
  firmDescription: {
    fontSize: getResponsiveValue(14, 15, 16),
    lineHeight: getResponsiveValue(18, 20, 22),
  },
});
