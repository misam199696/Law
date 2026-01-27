import React, { useState, useContext , useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Image,
    useColorScheme
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/svg/logo';
import Message from '../../assets/svg/message';
import Documents from '../../assets/svg/documents';
import Justice from '../../assets/svg/justice';
import PublicUser from '../../assets/svg/publicUser';
import IndividualUser from '../../assets/svg/individualUser';
import LawFirm from '../../assets/svg/lawFirm';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets

const getResponsiveValue = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const SignupTypeScreen = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [selectedType, setSelectedType] = useState(null);


      // Load saved language on component mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('userLanguage');
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
          setCurrentLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadLanguage();
  }, []);

    const accountTypes = [
        {
            id: 'public',
            title: t('signup.publicUser'),
            description: t('signup.publicUserDesc'),
            icon: <PublicUser width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
            iconColor: '#FFA500',
            iconBg: '#FFF5E6'
        },
        {
            id: 'individual',
            title: t('signup.individualUser'),
            description: t('signup.individualUserDesc'),
            icon: <IndividualUser width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
            iconColor: '#00BFA5',
            iconBg: '#E6F7F5'
        },
        {
            id: 'lawFirm',
            title: t('signup.lawFirm'),
            description: t('signup.lawFirmDesc'),
            icon: <LawFirm width={getResponsiveValue(16, 18, 20)} height={getResponsiveValue(16, 18, 20)} />,
            iconColor: '#FF5252',
            iconBg: '#FFEBEE'
        }
    ];


    

    const { colors } = useContext(ThemeContext);
    const isDarkMode = useColorScheme() === 'dark';

    const dynamicStyles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        container: {
            flex: 1,
        },
        scrollContainer: {
            flexGrow: 1,
            paddingBottom: getResponsiveValue(20, 25, 30),
        },
        logoContainer: {
            alignItems: 'center',
            padding: getResponsiveValue(20, 25, 30),
            paddingTop: getResponsiveValue(30, 40, 50),
            paddingBottom: getResponsiveValue(15, 18, 20),
        },
        appTitle: {
            fontSize: getResponsiveValue(16, 18, 20),
            fontWeight: '700',
            color: colors.text,
            textAlign: 'center',
            marginBottom: getResponsiveValue(6, 7, 8),
        },
        appSubtitle: {
            fontSize: getResponsiveValue(10, 11, 12),
            color: colors.secondary,
            textAlign: 'center',
            lineHeight: getResponsiveValue(16, 18, 20),
            paddingHorizontal: getResponsiveValue(8, 9, 10)
        },
        serviceButtonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: getResponsiveValue(10, 12, 15),
            marginBottom: getResponsiveValue(20, 25, 30),
        },
        serviceButton: {
            backgroundColor: colors.lightBlue,
            borderRadius: getResponsiveValue(8, 9, 10),
            alignItems: 'center',
            width: '32%',
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: 'space-evenly',
            paddingVertical: getResponsiveValue(1, 1, 1)
        },
        serviceButtonText: {
            fontSize: getResponsiveValue(7, 8, 9),
            fontWeight:'500',
            marginLeft: 0,
            color: colors.primary,
            textAlign: 'center',
        },
        section: {
            backgroundColor: colors.lightBlue,
            borderRadius: getResponsiveValue(16, 18, 20),
            padding: getResponsiveValue(16, 18, 20),    
            // marginBottom: 20,
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
            backgroundColor:   colors.card,
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
        radioButton: {
            width: getResponsiveValue(18, 20, 22),
            height: getResponsiveValue(18, 20, 22),
            borderRadius: getResponsiveValue(9, 10, 12),
            borderWidth: 2,
            borderColor: colors.border,
            justifyContent: 'center',
            alignItems: 'center',
        },
        footer: {
            padding: getResponsiveValue(16, 18, 20),
            paddingBottom: getResponsiveValue(20, 25, 30),
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
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
            marginTop: getResponsiveValue(30, 40, 50),
            
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

    const handleContinue = () => {
        if (selectedType) {
            navigation.navigate('SignupCreateAccount', { userType: selectedType });
        }
    };

    return (
        <SafeAreaView style={[dynamicStyles.safeArea, { backgroundColor: colors.background }]}>
            <View style={dynamicStyles.container}>
                <ScrollView
                    contentContainerStyle={dynamicStyles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {/* App Logo and Tagline */}
                    <View style={dynamicStyles.logoContainer}>
                        <View style={[styles.logoCircle, { backgroundColor: isDarkMode ? '#1E2E3D' : '#E6F7F5' }]}>
                           <Logo 
          width={40}
          height={40}
          style={styles.logo}
        />
                        </View>
                        <Text style={dynamicStyles.appTitle}>{t('signup.trustedLegalAssistant')}</Text>
                        <Text style={dynamicStyles.appSubtitle}>{t('signup.legalMarketplace')}</Text>
                    </View>

                    {/* Service Buttons */}
                    <View style={dynamicStyles.serviceButtonsContainer}>
                        <View style={[dynamicStyles.serviceButton, [
                            { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }
                        ]]}>
                           <Message width={getResponsiveValue(12, 14, 15)} height={getResponsiveValue(12, 14, 15)} />
                            <Text style={[dynamicStyles.serviceButtonText, { color: colors.text }]}>{t('signup.aiLegalAnswers')}</Text>
                        </View>
                        <View style={[dynamicStyles.serviceButton, [
                            { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }
                        ]]}>
                            <Documents width={getResponsiveValue(12, 14, 15)} height={getResponsiveValue(12, 14, 15)} />
                            <Text style={[dynamicStyles.serviceButtonText, { color: colors.text }]}>{t('signup.legalConsultations')}</Text>
                        </View>
                        <View style={[dynamicStyles.serviceButton, [
                            { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }
                        ]]}>
                            <Justice width={getResponsiveValue(12, 14, 15)} height={getResponsiveValue(12, 14, 15)} />
                            <Text style={[dynamicStyles.serviceButtonText, { color: colors.text }]}>{t('signup.legalResearch')}</Text>
                        </View>
                    </View>

                    {/* Account Type Selection */}
                    <View style={dynamicStyles.section}>
                        <Text style={[dynamicStyles.sectionTitle,{alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end'}]}>{t('signup.chooseAccountType')}</Text>
                        <Text style={[dynamicStyles.sectionSubtitle,{alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end'}]}>{t('signup.pickAccountType')}</Text>

                        <View style={styles.cardsContainer}>
                            {accountTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[
                                        dynamicStyles.card,
                                        selectedType === type.id && dynamicStyles.cardSelected
                                    ]}
                                    onPress={() => setSelectedType(type.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.cardContent,{flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse'}]}>
                                        <View style={[styles.iconContainer, { backgroundColor: type.iconBg }]}>
                                           {type.icon}
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={[dynamicStyles.cardTitle,{alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end'}]}>
                                                {type.id === 'public'
                                                    ? t('signup.publicUser')
                                                    : type.id === 'individual'
                                                        ? t('signup.individualUser')
                                                        : t('signup.lawFirm')}
                                            </Text>
                                            <Text style={[dynamicStyles.cardDescription,{alignSelf: currentLanguage === 'en' ? 'flex-start' : 'flex-end'}]}>
                                                {type.id === 'public'
                                                    ? t('signup.publicUserDesc')
                                                    : type.id === 'individual'
                                                        ? t('signup.individualUserDesc')
                                                        : t('signup.lawFirmDesc')}
                                            </Text>
                                        </View>
                                        {/* <View style={dynamicStyles.radioButton}>
                                            {selectedType === type.id && (
                                                <View style={[styles.radioButtonSelected, { backgroundColor: colors.primary }]} />
                                            )}
                                        </View> */}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{paddingBottom: getResponsiveValue(80, 90, 100)}} >
                         <TouchableOpacity
                        style={[
                            dynamicStyles.continueButton,
                            !selectedType && dynamicStyles.continueButtonDisabled
                        ]}
                        onPress={handleContinue}
                        disabled={!selectedType}
                        activeOpacity={0.8}
                    >
                        <Text style={dynamicStyles.continueButtonText}>{t('signup.createAccount')}</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Static styles that don't need theme awareness
    logoCircle: {
        width: getResponsiveValue(32, 36, 40),
        height: getResponsiveValue(32, 36, 40),
        borderRadius: getResponsiveValue(32, 36, 40),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getResponsiveValue(18, 21, 24),
    },
    logo: {
        width: getResponsiveValue(32, 36, 40),
        height: getResponsiveValue(32, 36, 40),
        resizeMode: 'contain',
        borderRadius: getResponsiveValue(8, 9, 10),
    },
    cardsContainer: {
        gap: getResponsiveValue(12, 14, 16),
        
    },
    cardContent: {
        alignItems: 'center',
        width: '100%'
    },
    iconContainer: {
        width: getResponsiveValue(28, 31, 34),
        height: getResponsiveValue(28, 31, 34),
        borderRadius: getResponsiveValue(10, 11, 12),
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textContainer: {
      paddingHorizontal: getResponsiveValue(8, 9, 10)
    },
    // radioButtonSelected: {
    //     width: 12,
    //     height: 12,
    //     borderRadius: 6,
    // },
});

export default SignupTypeScreen;