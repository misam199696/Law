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
import { scale, gavel, gavel2 } from '../../assets/images';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

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
            icon: 'person-outline',
            iconColor: '#FFA500',
            iconBg: '#FFF5E6'
        },
        {
            id: 'individual',
            title: t('signup.individualUser'),
            description: t('signup.individualUserDesc'),
            icon: 'business',
            iconColor: '#00BFA5',
            iconBg: '#E6F7F5'
        },
        {
            id: 'lawFirm',
            title: t('signup.lawFirm'),
            description: t('signup.lawFirmDesc'),
            icon: 'gavel',
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
            paddingBottom: 30,
        },
        logoContainer: {
            alignItems: 'center',
            padding: 30,
            paddingTop: 50,
            paddingBottom: 20,
        },
        appTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            textAlign: 'center',
            marginBottom: 8,
        },
        appSubtitle: {
            fontSize: 12,
            color: colors.secondary,
            textAlign: 'center',
            lineHeight: 20,
            paddingHorizontal:10
        },
        serviceButtonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 30,
        },
        serviceButton: {
            backgroundColor: colors.lightBlue,
            borderRadius: 10,
            alignItems: 'center',
            width: '32%',
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: 'space-evenly',
            paddingVertical: 1
        },
        serviceButtonText: {
            fontSize: 9,
            fontWeight:'500',
            marginLeft: 0,
            color: colors.primary,
            textAlign: 'center',
        },
        section: {
            backgroundColor: colors.lightBlue,
            borderRadius: 20,
            padding: 20,    
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border,
            
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 8,
        },
        sectionSubtitle: {
            fontSize: 14,
            color: colors.secondary,
            marginBottom: 20,
            lineHeight: 20,
        },
        card: {
            borderRadius: 12,
            padding: 12,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor:   colors.card,
        },
        cardSelected: {
            borderColor: colors.primary,
            backgroundColor: colors.lightBlue
        },
        cardTitle: {
            fontSize: 14,
            fontWeight: '700',
            color: isDarkMode === 'dark' ? '#020202ff' : colors.text,
            marginBottom: 4,
        },
        cardDescription: {
            fontSize: 12,
            color: isDarkMode === 'dark' ? colors.secondary : colors.secondary,
            lineHeight: 20,
        },
        radioButton: {
            width: 22,
            height: 22,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: colors.border,
            justifyContent: 'center',
            alignItems: 'center',
        },
        footer: {
            padding: 20,
            paddingBottom: 30,
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
        },
        continueButton: {
            height: 56,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
            marginTop: 30,
            paddingHorizontal: 100
        },
        continueButtonDisabled: {
            backgroundColor: isDarkMode ? '#2D3E4D' : '#56928dff',
            shadowOpacity: 0.5,
        },
        continueButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
    });

    const handleContinue = () => {
        if (selectedType) {
            navigation.navigate('SignUp', { userType: selectedType });
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
                            <Image
                                source={require('../../assets/images/Icon.png')}
                                style={[styles.logo,]}
                                resizeMode="contain"
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
                            <Icon name="help-outline" size={15} color={colors.primary} />
                            <Text style={[dynamicStyles.serviceButtonText, { color: colors.text }]}>{t('signup.aiLegalAnswers')}</Text>
                        </View>
                        <View style={[dynamicStyles.serviceButton, [
                            { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }
                        ]]}>
                            <Icon name="chat-bubble-outline" size={15} color={colors.primary} />
                            <Text style={[dynamicStyles.serviceButtonText, { color: colors.text }]}>{t('signup.legalConsultations')}</Text>
                        </View>
                        <View style={[dynamicStyles.serviceButton, [
                            { flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse' }
                        ]]}>
                            <Icon name="search" size={15} color={colors.primary} />
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
                                            <Icon
                                                name={type.icon}
                                                size={20}
                                                color={type.iconColor}
                                            />
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
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Static styles that don't need theme awareness
    logoCircle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    cardsContainer: {
        gap: 16,
        
    },
    cardContent: {
        alignItems: 'center',
        
       
        
        
    },
    iconContainer: {
        width: 34,
        height: 34,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textContainer: {
      paddingHorizontal:10
    },
    // radioButtonSelected: {
    //     width: 12,
    //     height: 12,
    //     borderRadius: 6,
    // },
});

export default SignupTypeScreen;