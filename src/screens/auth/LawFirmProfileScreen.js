import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    Alert,
    PermissionsAndroid,
    Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Documents from '../../assets/svg/documents';
import Camera from '../../assets/svg/camera';
import Upload from '../../assets/svg/upload';
import Book from '../../assets/svg/book';
import Justice from '../../assets/svg/justice';
import IndividualUser from '../../assets/svg/individualUser';
import BellIcon from '../../assets/svg/bellIcon';
import Star from '../../assets/svg/star';
import FirmDetails from '../../assets/svg/firmDetails';
import Dollar from '../../assets/svg/dollar';
import Gift from '../../assets/svg/gift';
import Peoples from '../../assets/svg/people';
import Explain from '../../assets/svg/explain';
import Clock from '../../assets/svg/clock';
import Calender from '../../assets/svg/calender';
import Graph from '../../assets/svg/graph';
import Documents2 from '../../assets/svg/documents2';
import { useColorScheme } from 'react-native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 375; // iPhone SE and similar small screens
const isMediumScreen = width > 375 && width <= 414; // 6-inch and normal screens
const isLargeScreen = width > 414; // Larger screens and tablets


const getResponsiveValue = (small, medium, large) => {
    if (isSmallScreen) return small;
    if (isMediumScreen) return medium;
    return large;
};

const LawFirmProfileScreen = () => {
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const { colors } = useContext(ThemeContext);
    const isDarkMode = useColorScheme() === 'dark';

    // State for managing focused inputs
    const [focusedInput, setFocusedInput] = useState(null);

    // State for managing selected practice areas
    const [selectedPracticeAreas, setSelectedPracticeAreas] = useState([]);

    // State for managing Firm Statistics fields
    const [establishedYear, setEstablishedYear] = useState('');
    const [casesHandled, setCasesHandled] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [bookingFee, setBookingFee] = useState('2000');
    const [offerFreeConsultation, setOfferFreeConsultation] = useState(false);

    // State for managing Operating Hours
    const [operatingHours, setOperatingHours] = useState({
        monday: { enabled: true, open: '09:00', close: '17:00' },
        tuesday: { enabled: true, open: '09:00', close: '17:00' },
        wednesday: { enabled: true, open: '09:00', close: '17:00' },
        thursday: { enabled: true, open: '09:00', close: '17:00' },
        friday: { enabled: true, open: '09:00', close: '17:00' },
        saturday: { enabled: false, open: '09:00', close: '17:00' },
        sunday: { enabled: false, open: '09:00', close: '17:00' },
    });

    // State for managing Firm Description
    const [firmDescription, setFirmDescription] = useState('');

    // State for managing Firm Logo
    const [firmLogo, setFirmLogo] = useState(null);

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

    // Function to handle image selection
    const handleChoosePhoto = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Alert.alert('Error', 'Failed to pick image. Please try again.');
            } else {
                const source = response.assets[0];
                setFirmLogo(source);
            }
        });
    };

    // Function to handle image deletion
    const handleDeletePhoto = () => {
        Alert.alert(
            'Delete Logo',
            'Are you sure you want to delete the firm logo?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => setFirmLogo(null),
                    style: 'destructive',
                },
            ]
        );
    };

    const dynamicStyles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            flexGrow: 1,
            paddingBottom: getResponsiveValue(20, 30, 40),
        },
        container: {
            flex: 1,
            paddingHorizontal: getResponsiveValue(5, 10, 15),
            paddingTop: getResponsiveValue(15, 25, 35),
        },
        completeProfileSection: {
            alignItems: 'center',
            marginBottom: getResponsiveValue(20, 30, 40),
        },
        profileIconContainer: {
            width: getResponsiveValue(40, 50, 60),
            height: getResponsiveValue(40, 50, 60),
            borderRadius: getResponsiveValue(40, 50, 60),
            backgroundColor: '#14B8A6',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: getResponsiveValue(20, 25, 30),
        },
        mainTitle: {
            fontSize: getResponsiveValue(25, 26, 28),
            fontWeight: '700',
            color: colors.text,
            textAlign: 'center',
            marginBottom: getResponsiveValue(12, 15, 18),
        },
        descriptionText: {
            fontSize: getResponsiveValue(12, 14, 16),
            color: colors.secondary,
            textAlign: 'center',
            lineHeight: getResponsiveValue(20, 22, 24),
            paddingHorizontal: getResponsiveValue(5, 10, 15),
            marginBottom: getResponsiveValue(20, 25, 30),
        },
        profileCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(5, 10, 12),
            width: '92%',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        cardIconContainer: {
            width: getResponsiveValue(30, 35, 40),
            height: getResponsiveValue(30, 35, 40),
            borderRadius: getResponsiveValue(30, 35, 40),
            backgroundColor: '#14B8A6',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: getResponsiveValue(12, 14, 16),
        },
        cardTextContainer: {
            flex: 1,
        },
        cardTitle: {
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '600',
            color: colors.text,
            marginBottom: getResponsiveValue(2, 3, 4),
            marginLeft: getResponsiveValue(5, 10, 15),
        },
        separator: {
            width: 1,
            height: getResponsiveValue(30, 35, 40),
            backgroundColor: colors.border,
            marginHorizontal: getResponsiveValue(12, 14, 16),
        },
        statusText: {
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '600',
            color: '#14B8A6',
        },
        firmLogoHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        firmLogoNumber: {
            color: '#14B8A6',
            fontSize: getResponsiveValue(15, 16, 18),
            fontWeight: '600',
            marginRight: getResponsiveValue(8, 10, 12),
        },
        firmLogoTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        logoContainer: {
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
            width: "100%"
        },
        logoImage: {
            width: getResponsiveValue(100, 120, 140),
            height: getResponsiveValue(100, 120, 140),
            borderRadius: getResponsiveValue(12, 14, 16),
            
            borderWidth: 2,
            borderColor: colors.border,
        },
        logoPlaceholder: {
            width: "100%",
            // height: getResponsiveValue(100, 120, 140),
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingVertical: getResponsiveValue(20, 25, 30),
           backgroundColor: colors.background,
            borderWidth: 2,
            borderColor: colors.border,
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logoWithDeleteContainer: {
            position: 'relative',
            alignItems: 'center',
        },
        deleteOverlayButton: {
            position: 'absolute',
            top: getResponsiveValue(-5, -8, -10),
            right: getResponsiveValue(-5, -8, -10),
            backgroundColor: "#efececff",
            borderRadius: getResponsiveValue(12, 14, 16),
            width: getResponsiveValue(24, 28, 32),
            height: getResponsiveValue(24, 28, 32),
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#FFFFFF',
        },
        logoButtonsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logoButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(8, 10, 12),
            paddingHorizontal: getResponsiveValue(12, 14, 16),
            paddingVertical: getResponsiveValue(8, 10, 12),
            marginHorizontal: getResponsiveValue(5, 6, 7),
        },
        logoButtonText: {
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '500',
            color: colors.text,
        },
        deleteButton: {
            borderColor: '#EF4444',
        },
        deleteButtonText: {
            color: '#EF4444',
        },
        firmLogoSection: {
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(10, 12, 14),
            width: '98%',
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        firmLogoHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        firmLogoTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        uploadArea: {
            borderWidth: 2,
            borderColor: colors.border,
            borderStyle: 'dashed',
            borderRadius: getResponsiveValue(12, 14, 16),
            padding: getResponsiveValue(20, 25, 30),
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        uploadIconContainer: {
            width: getResponsiveValue(40, 50, 60),
            height: getResponsiveValue(40, 50, 60),
            borderRadius: getResponsiveValue(40, 50, 60),
            backgroundColor: '#F0FDFB',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        uploadTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginBottom: getResponsiveValue(5, 8, 10),
        },
        uploadSubtitle: {
            fontSize: getResponsiveValue(5, 9, 12),
            color: colors.secondary,
            textAlign: 'center',
        },
        firmDetailsSection: {
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(10, 12, 14),
            width: '98%',
            alignSelf: 'center',
            marginTop: getResponsiveValue(15, 20, 25),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        firmDetailsHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: getResponsiveValue(15, 20, 25),

        },
        firmDetailsNumber: {
            // width: getResponsiveValue(24, 28, 32),
            // height: getResponsiveValue(24, 28, 32),
            // borderRadius: getResponsiveValue(24, 28, 32),
            // backgroundColor: '#14B8A6',
            color: '#14B8A6',
            fontSize: getResponsiveValue(15, 16, 18),
            fontWeight: '600',
            // textAlign: 'center',
            // textAlignVertical: 'center',
            marginRight: getResponsiveValue(8, 10, 12),
        },
        firmDetailsTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        inputLabel: {
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '500',
            color: colors.text,
            marginBottom: getResponsiveValue(5, 8, 10),
        },
        textInput: (inputName) => ({
            borderWidth: 1,
            borderColor: focusedInput === inputName ? '#14B8A6' : colors.border,
            borderRadius: getResponsiveValue(8, 10, 12),
            paddingHorizontal: getResponsiveValue(12, 14, 16),
            paddingVertical: getResponsiveValue(10, 12, 14),
            fontSize: getResponsiveValue(12, 14, 16),
            color: colors.text,
            backgroundColor: colors.background,
            marginBottom: getResponsiveValue(15, 20, 25),
        }),
        practiceAreasSection: {
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(10, 12, 14),
            width: '92%',
            alignSelf: 'center',
            marginTop: getResponsiveValue(15, 20, 25),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        practiceAreasHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        practiceAreasNumber: {
            color: '#14B8A6',
            fontSize: getResponsiveValue(15, 16, 18),
            fontWeight: '600',
            marginRight: getResponsiveValue(8, 10, 12),
        },
        practiceAreasTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        practiceAreasSubtitle: {
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '500',
            color: colors.text,
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        practiceAreasContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        practiceAreaButton: (isSelected) => ({
            paddingVertical: getResponsiveValue(8, 10, 12),
            paddingHorizontal: getResponsiveValue(12, 15, 18),
            borderRadius: getResponsiveValue(20, 25, 30),
            borderWidth: 1,
            borderColor: isSelected ? '#14B8A6' : colors.border,
            marginRight: getResponsiveValue(8, 10, 12),
            marginBottom: getResponsiveValue(8, 10, 12),
            backgroundColor: isSelected ? '#E0F2F1' : colors.background,
        }),
        practiceAreaButtonText: (isSelected) => ({
            fontSize: getResponsiveValue(12, 14, 16),
            color: isSelected ? '#14B8A6' : colors.text,
        }),
        firmStatisticsSection: {
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(10, 12, 14),
            width: '98%',
            alignSelf: 'center',
            marginTop: getResponsiveValue(15, 20, 25),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        firmStatisticsHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        firmStatisticsNumber: {
            color: '#14B8A6',
            fontSize: getResponsiveValue(15, 16, 18),
            fontWeight: '600',
            marginRight: getResponsiveValue(8, 10, 12),
        },
        firmStatisticsTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        bookingFeeHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(12, 14, 16),
        },
        bookingFeeTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
            flex: 1,
        },
        consultationSection: {
            backgroundColor: '#F0FDFB',
            borderRadius: getResponsiveValue(8, 10, 12),
            // paddingVertical: getResponsiveValue(5, 8, 12),
            // paddingHorizontal: getResponsiveValue(12, 14, 16),
        },
        consultationHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(4, 6, 8),
        },
        consultationTitle: {
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
            flex: 1,
        },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: getResponsiveValue(0, 0, 0),
            backgroundColor: colors.background,
        },
        checkbox: {
            width: getResponsiveValue(12, 14, 16),
            height: getResponsiveValue(12, 14, 16),
            borderWidth: 2,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(4, 5, 6),
            marginRight: getResponsiveValue(10, 12, 14),
            marginLeft: getResponsiveValue(8, 10, 12),
            justifyContent: 'center',
            alignItems: 'center',
        },
        checkboxChecked: {
            backgroundColor: '#14B8A6',
            borderColor: '#14B8A6',
        },
        checkboxInner: {
            width: getResponsiveValue(5, 8, 12),
            height: getResponsiveValue(5, 8, 12),
            backgroundColor: '#FFFFFF',
            borderRadius: getResponsiveValue(2, 3, 4),
        },
        checkboxLabel: {
            flex: 1,
            fontSize: getResponsiveValue(12, 14, 16),
            color: colors.text,
            lineHeight: getResponsiveValue(18, 20, 22),
        },
        inviteLawyersSection: {
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(10, 12, 14),
            width: '90%',
            alignSelf: 'center',
            marginTop: getResponsiveValue(15, 20, 25),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        inviteLawyersHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        inviteLawyersNumber: {
            color: '#14B8A6',
            fontSize: getResponsiveValue(15, 16, 18),
            fontWeight: '600',
            marginRight: getResponsiveValue(8, 10, 12),
        },
        inviteLawyersTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        inviteLawyersDescription: {
            fontSize: getResponsiveValue(10, 12, 14),
            color: colors.secondary,
            lineHeight: getResponsiveValue(12, 14, 16),
            marginBottom: getResponsiveValue(5, 10, 15),
        },
        infoMessageContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            color: colors.text,
            // backgroundColor: '#F0FDFB',
            // borderRadius: getResponsiveValue(8, 10, 12),
            // padding: getResponsiveValue(5, 7, 9),
            marginTop: getResponsiveValue(10, 12, 14),
        },
        operatingHoursSection: {
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(10, 12, 14),
            width: '90%',
            alignSelf: 'center',
            marginTop: getResponsiveValue(15, 20, 25),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        operatingHoursHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        operatingHoursNumber: {
            color: '#14B8A6',
            fontSize: getResponsiveValue(15, 16, 18),
            fontWeight: '600',
            marginRight: getResponsiveValue(8, 10, 12),
        },
        operatingHoursTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        dayScheduleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: getResponsiveValue(8, 10, 12),
            borderBottomWidth: 0.5,
            borderBottomColor: colors.border,
        },
        dayName: {
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '500',
            color: colors.text,
            flex: 1,
        },
        timeInputsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 2,
        },
        timeInput: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(6, 8, 10),
            paddingHorizontal: getResponsiveValue(8, 10, 12),
            paddingVertical: getResponsiveValue(6, 8, 10),
            fontSize: getResponsiveValue(10, 12, 14),
            color: colors.text,
            backgroundColor: colors.background,
            width: getResponsiveValue(60, 70, 80),
            textAlign: 'center',
        },
        timeSeparator: {
            fontSize: getResponsiveValue(10, 12, 14),
            color: colors.secondary,
            marginHorizontal: getResponsiveValue(8, 10, 12),
        },
        dayToggle: {
            width: getResponsiveValue(40, 45, 50),
            height: getResponsiveValue(22, 25, 28),
            borderRadius: getResponsiveValue(11, 12, 14),
            backgroundColor: colors.border,
            justifyContent: 'center',
            paddingHorizontal: getResponsiveValue(2, 3, 4),
        },
        dayToggleActive: {
            backgroundColor: '#14B8A6',
        },
        dayToggleCircle: {
            width: getResponsiveValue(18, 20, 22),
            height: getResponsiveValue(18, 20, 22),
            borderRadius: getResponsiveValue(9, 10, 11),
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
        },
        firmDescriptionSection: {
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(16, 18, 20),
            paddingVertical: getResponsiveValue(10, 12, 14),
            width: '90%',
            alignSelf: 'center',
            marginTop: getResponsiveValue(15, 20, 25),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        firmDescriptionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        firmDescriptionNumber: {
            color: '#14B8A6',
            fontSize: getResponsiveValue(15, 16, 18),
            fontWeight: '600',
            marginRight: getResponsiveValue(8, 10, 12),
        },
        firmDescriptionTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginLeft: getResponsiveValue(8, 10, 12),
        },
        firmDescriptionTextInput: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(8, 10, 12),
            paddingHorizontal: getResponsiveValue(12, 14, 16),
            paddingVertical: getResponsiveValue(10, 12, 14),
            fontSize: getResponsiveValue(12, 14, 16),
            color: colors.text,
            backgroundColor: colors.background,
            minHeight: getResponsiveValue(80, 100, 120),
            textAlignVertical: 'top',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        writingTipsContainer: {
            backgroundColor: colors.background,
            borderRadius: getResponsiveValue(8, 10, 12),
            padding: getResponsiveValue(12, 14, 16),
        },
        writingTipsTitle: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
            marginBottom: getResponsiveValue(8, 10, 12),
        },
        tipItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: getResponsiveValue(6, 8, 10),
        },
        tipNumber: {
            width: getResponsiveValue(20, 22, 24),
            height: getResponsiveValue(20, 22, 24),
            borderRadius: getResponsiveValue(10, 11, 12),
            backgroundColor: '#14B8A6',
            color: '#FFFFFF',
            fontSize: getResponsiveValue(10, 12, 14),
            fontWeight: '600',
            textAlign: 'center',
            lineHeight: getResponsiveValue(20, 22, 24),
            marginRight: getResponsiveValue(8, 10, 12),
        },
        tipText: {
            fontSize: getResponsiveValue(10, 12, 14),
            color: colors.secondary,
            flex: 1,
            lineHeight: getResponsiveValue(14, 16, 18),
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: getResponsiveValue(16, 20, 24),
            paddingVertical: getResponsiveValue(20, 24, 28),
            marginTop: getResponsiveValue(10, 15, 20),
        },
        saveDraftButton: {
            flex: 1,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(8, 10, 12),
            paddingVertical: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(20, 24, 28),
            marginRight: getResponsiveValue(8, 10, 12),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        submitButton: {
            flex: 1,
            backgroundColor: '#14B8A6',
            borderRadius: getResponsiveValue(8, 10, 12),
            paddingVertical: getResponsiveValue(12, 14, 16),
            paddingHorizontal: getResponsiveValue(20, 24, 28),
            marginLeft: getResponsiveValue(8, 10, 12),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
        },
        saveDraftButtonText: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: colors.text,
        },
        submitButtonText: {
            fontSize: getResponsiveValue(12, 14, 16),
            fontWeight: '600',
            color: '#FFFFFF',
        },
        firmStatsCardsContainer: {
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'space-between',
            marginBottom: getResponsiveValue(15, 20, 25),
        },
        firmStatCard: {
            flex: isSmallScreen ? undefined : 1,
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(8, 10, 12),
            padding: getResponsiveValue(5, 8, 10),
            marginHorizontal: isSmallScreen ? 0 : getResponsiveValue(4, 5, 6),
            marginBottom: isSmallScreen ? getResponsiveValue(10, 12, 15) : 0,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
            minWidth: isSmallScreen ? '100%' : undefined,
            width: isSmallScreen ? '100%' : undefined,
        },
        firmStatCardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getResponsiveValue(8, 10, 12),
            justifyContent: currentLanguage === 'ur' ? 'flex-end' : 'flex-start',
        },
        firmStatCardTitle: {
            fontSize: getResponsiveValue(7, 9, 10),
            fontWeight: '500',
            color: colors.text,
            marginLeft: getResponsiveValue(6, 8, 10),
            flex: 1,
            flexWrap: 'wrap',
            textAlign: currentLanguage === 'ur' ? 'right' : 'left',
            writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr',
        },
        bookingConsultationCard: {
            backgroundColor: colors.background,
            borderWidth: 0.5,
            borderColor: colors.border,
            borderRadius: getResponsiveValue(12, 14, 16),
            padding: getResponsiveValue(16, 18, 20),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        firmStatCardInput: (inputName) => ({
            borderWidth: 1,
            borderColor: focusedInput === inputName ? '#14B8A6' : colors.border,
            borderRadius: getResponsiveValue(6, 8, 10),
            paddingHorizontal: getResponsiveValue(5, 8, 10),
            paddingVertical: getResponsiveValue(1, 2, 3),
            fontSize: getResponsiveValue(11, 13, 15),
            color: colors.text,
            backgroundColor: colors.background,
            minWidth: 0,
            flex: 1,
            textAlign: currentLanguage === 'ur' ? 'right' : 'left',
            writingDirection: currentLanguage === 'ur' ? 'rtl' : 'ltr',
        }),
    });

    return (
        <SafeAreaView style={dynamicStyles.safeArea}>
            <ScrollView
                style={dynamicStyles.scrollView}
                contentContainerStyle={dynamicStyles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={dynamicStyles.container}>
                    <View style={dynamicStyles.completeProfileSection}>
                        <View style={dynamicStyles.profileIconContainer}>
                            <Documents width={getResponsiveValue(5, 25, 35)} height={getResponsiveValue(10, 25, 35)} />
                        </View>
                        <Text style={dynamicStyles.mainTitle}>Complete Your Profile</Text>
                        <Text style={dynamicStyles.descriptionText}>
                            Join Pakistan's largest legal marketplace and connect with clients looking for your expertise
                        </Text>

                        <TouchableOpacity style={dynamicStyles.profileCard}>
                            <View style={dynamicStyles.cardIconContainer}>
                                <Star width={getResponsiveValue(18, 22, 26)} height={getResponsiveValue(18, 22, 26)} />
                            </View>
                            <View style={dynamicStyles.cardTextContainer}>
                                <Text style={dynamicStyles.cardTitle}>Complete Your Profile</Text>
                            </View>
                            <View style={dynamicStyles.separator} />
                            <Text style={dynamicStyles.statusText}>Almost there!</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Firm Logo Section */}
                <View style={dynamicStyles.firmLogoSection}>
                    <View style={dynamicStyles.firmLogoHeader}>
                        <Camera width={getResponsiveValue(18, 20, 22)} height={getResponsiveValue(18, 20, 22)} />
                        <Text style={dynamicStyles.firmLogoTitle}>Firm Logo</Text>
                    </View>

                    <View style={dynamicStyles.logoContainer}>
                        {firmLogo ? (
                            <View style={dynamicStyles.logoWithDeleteContainer}>
                                <Image source={{ uri: firmLogo.uri }} style={dynamicStyles.logoImage} />
                                <TouchableOpacity
                                    style={dynamicStyles.deleteOverlayButton}
                                    onPress={handleDeletePhoto}
                                >
                                    <Camera width={getResponsiveValue(12, 14, 16)} height={getResponsiveValue(12, 14, 16)} fill="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={dynamicStyles.logoPlaceholder}
                                onPress={handleChoosePhoto}
                            >
                                <View style={dynamicStyles.uploadIconContainer}>
                                <Upload width={getResponsiveValue(20, 35, 40)} height={getResponsiveValue(30, 35, 40)} />
                            </View>
                                <Text style={[dynamicStyles.uploadTitle, { marginTop: getResponsiveValue(8, 10, 12) }]}>
                                    Upload Logo
                                </Text>
                                <Text style={[dynamicStyles.uploadSubtitle, { marginTop: getResponsiveValue(4, 6, 8) }]}>
                                    Recommended: Square image, max 5MB
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                    {/* Firm Details Section */}
                    <View style={dynamicStyles.firmDetailsSection}>
                        <View style={dynamicStyles.firmDetailsHeader}>
                            <Text style={dynamicStyles.firmDetailsNumber}>1</Text>
                            <FirmDetails width={[getResponsiveValue(18, 20, 22)]} height={getResponsiveValue(18, 20, 22)} />
                            <Text style={dynamicStyles.firmDetailsTitle}>Firm Details</Text>
                        </View>

                        {/* Firm Name Input */}
                        <Text style={dynamicStyles.inputLabel}>Firm Name</Text>
                        <TextInput
                            style={dynamicStyles.textInput('firmName')}
                            placeholder="e.g., Smith & Associates Law Firm"
                            placeholderTextColor={colors.secondary}
                            onFocus={() => setFocusedInput('firmName')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        {/* Firm Phone Input */}
                        <Text style={dynamicStyles.inputLabel}>Firm Phone</Text>
                        <TextInput
                            style={dynamicStyles.textInput('firmPhone')}
                            placeholder="+92 300 1234567"
                            placeholderTextColor={colors.secondary}
                            keyboardType="phone-pad"
                            onFocus={() => setFocusedInput('firmPhone')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        {/* Firm Address Input */}
                        <Text style={dynamicStyles.inputLabel}>Firm Address</Text>
                        <TextInput
                            style={dynamicStyles.textInput('firmAddress')}
                            placeholder="123 Legal Street, Lahore, Pakistan"
                            placeholderTextColor={colors.secondary}
                            onFocus={() => setFocusedInput('firmAddress')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        {/* Registration No / Bar Council Input */}
                        <Text style={dynamicStyles.inputLabel}>Registration No / Bar Council *</Text>
                        <TextInput
                            style={dynamicStyles.textInput('registrationNo')}
                            placeholder="ABC123"
                            placeholderTextColor={colors.secondary}
                            onFocus={() => setFocusedInput('registrationNo')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        {/* City Input */}
                        <Text style={dynamicStyles.inputLabel}>City</Text>
                        <TextInput
                            style={dynamicStyles.textInput('city')}
                            placeholder="Select City"
                            placeholderTextColor={colors.secondary}
                            onFocus={() => setFocusedInput('city')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        {/* Website Input */}
                        <Text style={dynamicStyles.inputLabel}>Website</Text>
                        <TextInput
                            style={dynamicStyles.textInput('website')}
                            placeholder="www.com"
                            placeholderTextColor={colors.secondary}
                            keyboardType="url"
                            onFocus={() => setFocusedInput('website')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>
                </View>

                

                {/* Practice Areas Section */}
                <View style={dynamicStyles.practiceAreasSection}>
                    <View style={dynamicStyles.practiceAreasHeader}>
                        <Text style={dynamicStyles.practiceAreasNumber}>2</Text>
                        <Justice width={getResponsiveValue(18, 20, 22)} height={getResponsiveValue(18, 20, 22)} />
                        <Text style={dynamicStyles.practiceAreasTitle}>Practice Areas</Text>
                    </View>

                    <Text style={dynamicStyles.practiceAreasSubtitle}>Select Your Practice Areas</Text>

                    <View style={dynamicStyles.practiceAreasContainer}>
                        {[
                            'Criminal Law',
                            'Insurance Law',
                            'Environmental Law',
                            'Intellectual Property',
                            'Tax Law',
                            'Labor & Employment',
                            'Corporate Law',
                            'Human Rights Law',
                            'Family Law'
                        ].map((area) => {
                            const isSelected = selectedPracticeAreas.includes(area);
                            return (
                                <TouchableOpacity
                                    key={area}
                                    style={dynamicStyles.practiceAreaButton(isSelected)}
                                    onPress={() => {
                                        if (isSelected) {
                                            setSelectedPracticeAreas(selectedPracticeAreas.filter(item => item !== area));
                                        } else {
                                            setSelectedPracticeAreas([...selectedPracticeAreas, area]);
                                        }
                                    }}
                                >
                                    <Text style={dynamicStyles.practiceAreaButtonText(isSelected)}>
                                        {area}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Firm Statistics Section */}
                <View style={dynamicStyles.firmStatisticsSection}>
                    <View style={dynamicStyles.firmStatisticsHeader}>
                        <Text style={dynamicStyles.firmStatisticsNumber}>3</Text>
                        <Justice width={getResponsiveValue(18, 20, 22)} height={getResponsiveValue(18, 20, 22)} />
                        <Text style={dynamicStyles.firmStatisticsTitle}>Firm Statistics</Text>
                    </View>

                    {/* Stat Cards Container */}
                    <View style={dynamicStyles.firmStatsCardsContainer}>
                        {/* Established Year Card */}
                        <View style={dynamicStyles.firmStatCard}>
                            <View style={dynamicStyles.firmStatCardHeader}>
                                <Calender width={getResponsiveValue(12, 14, 16)} height={getResponsiveValue(16, 18, 20)} />
                                <Text style={dynamicStyles.firmStatCardTitle}>Established Year *</Text>
                            </View>
                            <TextInput
                                style={dynamicStyles.firmStatCardInput('establishedYear')}
                                placeholder="2020"
                                placeholderTextColor={colors.secondary}
                                value={establishedYear}
                                onChangeText={(text) => {
                                    if (text.length <= 4) {
                                        setEstablishedYear(text);
                                    }
                                }}
                                keyboardType="numeric"
                                onFocus={() => setFocusedInput('establishedYear')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>

                        {/* Cases Handled Card */}
                        <View style={dynamicStyles.firmStatCard}>
                            <View style={dynamicStyles.firmStatCardHeader}>
                                <Graph width={getResponsiveValue(12, 14, 16)} height={getResponsiveValue(16, 18, 20)} />
                                <Text style={dynamicStyles.firmStatCardTitle}>Cases Handled</Text>
                            </View>
                            <TextInput
                                style={dynamicStyles.firmStatCardInput('casesHandled')}
                                placeholder="0"
                                placeholderTextColor={colors.secondary}
                                value={casesHandled}
                                onChangeText={setCasesHandled}
                                keyboardType="numeric"
                                onFocus={() => setFocusedInput('casesHandled')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>

                        {/* Team Size Card */}
                        <View style={dynamicStyles.firmStatCard}>
                            <View style={dynamicStyles.firmStatCardHeader}>
                                <Peoples width={getResponsiveValue(12, 14, 16)} height={getResponsiveValue(16, 18, 20)} />
                                <Text style={dynamicStyles.firmStatCardTitle}>Team Size</Text>
                            </View>
                            <TextInput
                                style={dynamicStyles.firmStatCardInput('teamSize')}
                                placeholder="0"
                                placeholderTextColor={colors.secondary}
                                value={teamSize}
                                onChangeText={setTeamSize}
                                keyboardType="numeric"
                                onFocus={() => setFocusedInput('teamSize')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>
                    </View>

                    {/* Firm Booking Fee and Consultation Card */}
                    <View style={dynamicStyles.bookingConsultationCard}>
                        {/* Firm Booking Fee Section */}
                        <View>
                            <View style={dynamicStyles.bookingFeeHeader}>
                                <Dollar width={getResponsiveValue(24, 22, 24)} height={getResponsiveValue(24, 22, 24)} />
                                <Text style={dynamicStyles.bookingFeeTitle}>Firm Booking Fee (PKR) *</Text>
                            </View>
                            <TextInput
                                style={dynamicStyles.textInput('bookingFee')}
                                placeholder="2000"
                                placeholderTextColor={colors.secondary}
                                value={bookingFee}
                                onChangeText={setBookingFee}
                                keyboardType="numeric"
                                onFocus={() => setFocusedInput('bookingFee')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>

                        {/* Free Consultation Section */}
                        <View style={dynamicStyles.consultationSection}>
                            <View style={dynamicStyles.checkboxContainer}>
                                <TouchableOpacity
                                    style={[
                                        dynamicStyles.checkbox,
                                        offerFreeConsultation && dynamicStyles.checkboxChecked
                                    ]}
                                    onPress={() => setOfferFreeConsultation(!offerFreeConsultation)}
                                >
                                    {offerFreeConsultation && (
                                        <View style={dynamicStyles.checkboxInner} />
                                    )}
                                </TouchableOpacity>
                                <View style={{ flex: 1, backgroundColor: colors.background }}>
                                    <View style={dynamicStyles.consultationHeader}>
                                        <Gift width={getResponsiveValue(12, 14, 16)} height={getResponsiveValue(12, 14, 16)} />
                                        <Text style={dynamicStyles.consultationTitle}>Offer Free 15-Minute Consultation</Text>
                                    </View>
                                    <Text style={dynamicStyles.inviteLawyersDescription}>
                                        Attract more clients by offering complimentary initial consultations!
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                   
                </View>
                 {/* Invite Associated Lawyers Section */}
                    <View style={dynamicStyles.inviteLawyersSection}>
                        <View style={dynamicStyles.inviteLawyersHeader}>
                            <Text style={dynamicStyles.inviteLawyersNumber}>4</Text>
                            <Peoples width={getResponsiveValue(18, 20, 22)} height={getResponsiveValue(18, 20, 22)} />
                            <Text style={dynamicStyles.inviteLawyersTitle}>Invite Associated Lawyers</Text>
                        </View>
                        
                        <Text style={dynamicStyles.inviteLawyersDescription}>
                            Send invitations to lawyers who will be part of your firm. They'll receive an
                            email to join your team.
                        </Text>
                        
                        <TextInput
                            style={dynamicStyles.textInput('lawyerName')}
                            placeholder="Lawyer's name"
                            placeholderTextColor={colors.secondary}
                            onFocus={() => setFocusedInput('lawyerName')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        
                        <TextInput
                            style={dynamicStyles.textInput('lawyerEmail')}
                            placeholder="lawyer@email.com"
                            placeholderTextColor={colors.secondary}
                            keyboardType="email-address"
                            onFocus={() => setFocusedInput('lawyerEmail')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        
                        <View style={dynamicStyles.infoMessageContainer}>
                            <Explain width={getResponsiveValue(10, 12, 14)} height={getResponsiveValue(10, 12, 14)} />
                            <Text style={dynamicStyles.inviteLawyersDescription}>
                                  Invitations will be sent via email once you submit the form. Lawyers can join your firm by clicking the link in the email.
                            </Text>
                        </View>
                    </View>

                    {/* Operating Hours Section */}
                    <View style={dynamicStyles.operatingHoursSection}>
                        <View style={dynamicStyles.operatingHoursHeader}>
                            <Text style={dynamicStyles.operatingHoursNumber}>5</Text>
                            <Clock width={getResponsiveValue(14, 16, 18)} height={getResponsiveValue(14, 16, 18)} />
                            <Text style={dynamicStyles.operatingHoursTitle}>Operating Hours</Text>
                        </View>
                        
                        {/* Monday */}
                        <View style={dynamicStyles.dayScheduleContainer}>
                            <Text style={dynamicStyles.dayName}>Monday</Text>
                            <View style={dynamicStyles.timeInputsContainer}>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.monday.open}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        monday: { ...prev.monday, open: text }
                                    }))}
                                    placeholder="09:00"
                                />
                                <Text style={dynamicStyles.timeSeparator}>to</Text>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.monday.close}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        monday: { ...prev.monday, close: text }
                                    }))}
                                    placeholder="17:00"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    dynamicStyles.dayToggle,
                                    operatingHours.monday.enabled && dynamicStyles.dayToggleActive
                                ]}
                                onPress={() => setOperatingHours(prev => ({
                                    ...prev,
                                    monday: { ...prev.monday, enabled: !prev.monday.enabled }
                                }))}
                            >
                                <View style={[
                                    dynamicStyles.dayToggleCircle,
                                    { alignSelf: operatingHours.monday.enabled ? 'flex-end' : 'flex-start' }
                                ]} />
                            </TouchableOpacity>
                        </View>

                        {/* Tuesday */}
                        <View style={dynamicStyles.dayScheduleContainer}>
                            <Text style={dynamicStyles.dayName}>Tuesday</Text>
                            <View style={dynamicStyles.timeInputsContainer}>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.tuesday.open}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        tuesday: { ...prev.tuesday, open: text }
                                    }))}
                                    placeholder="09:00"
                                />
                                <Text style={dynamicStyles.timeSeparator}>to</Text>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.tuesday.close}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        tuesday: { ...prev.tuesday, close: text }
                                    }))}
                                    placeholder="17:00"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    dynamicStyles.dayToggle,
                                    operatingHours.tuesday.enabled && dynamicStyles.dayToggleActive
                                ]}
                                onPress={() => setOperatingHours(prev => ({
                                    ...prev,
                                    tuesday: { ...prev.tuesday, enabled: !prev.tuesday.enabled }
                                }))}
                            >
                                <View style={[
                                    dynamicStyles.dayToggleCircle,
                                    { alignSelf: operatingHours.tuesday.enabled ? 'flex-end' : 'flex-start' }
                                ]} />
                            </TouchableOpacity>
                        </View>

                        {/* Wednesday */}
                        <View style={dynamicStyles.dayScheduleContainer}>
                            <Text style={dynamicStyles.dayName}>Wednesday</Text>
                            <View style={dynamicStyles.timeInputsContainer}>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.wednesday.open}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        wednesday: { ...prev.wednesday, open: text }
                                    }))}
                                    placeholder="09:00"
                                />
                                <Text style={dynamicStyles.timeSeparator}>to</Text>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.wednesday.close}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        wednesday: { ...prev.wednesday, close: text }
                                    }))}
                                    placeholder="17:00"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    dynamicStyles.dayToggle,
                                    operatingHours.wednesday.enabled && dynamicStyles.dayToggleActive
                                ]}
                                onPress={() => setOperatingHours(prev => ({
                                    ...prev,
                                    wednesday: { ...prev.wednesday, enabled: !prev.wednesday.enabled }
                                }))}
                            >
                                <View style={[
                                    dynamicStyles.dayToggleCircle,
                                    { alignSelf: operatingHours.wednesday.enabled ? 'flex-end' : 'flex-start' }
                                ]} />
                            </TouchableOpacity>
                        </View>

                        {/* Thursday */}
                        <View style={dynamicStyles.dayScheduleContainer}>
                            <Text style={dynamicStyles.dayName}>Thursday</Text>
                            <View style={dynamicStyles.timeInputsContainer}>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.thursday.open}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        thursday: { ...prev.thursday, open: text }
                                    }))}
                                    placeholder="09:00"
                                />
                                <Text style={dynamicStyles.timeSeparator}>to</Text>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.thursday.close}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        thursday: { ...prev.thursday, close: text }
                                    }))}
                                    placeholder="17:00"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    dynamicStyles.dayToggle,
                                    operatingHours.thursday.enabled && dynamicStyles.dayToggleActive
                                ]}
                                onPress={() => setOperatingHours(prev => ({
                                    ...prev,
                                    thursday: { ...prev.thursday, enabled: !prev.thursday.enabled }
                                }))}
                            >
                                <View style={[
                                    dynamicStyles.dayToggleCircle,
                                    { alignSelf: operatingHours.thursday.enabled ? 'flex-end' : 'flex-start' }
                                ]} />
                            </TouchableOpacity>
                        </View>

                        {/* Friday */}
                        <View style={dynamicStyles.dayScheduleContainer}>
                            <Text style={dynamicStyles.dayName}>Friday</Text>
                            <View style={dynamicStyles.timeInputsContainer}>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.friday.open}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        friday: { ...prev.friday, open: text }
                                    }))}
                                    placeholder="09:00"
                                />
                                <Text style={dynamicStyles.timeSeparator}>to</Text>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.friday.close}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        friday: { ...prev.friday, close: text }
                                    }))}
                                    placeholder="17:00"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    dynamicStyles.dayToggle,
                                    operatingHours.friday.enabled && dynamicStyles.dayToggleActive
                                ]}
                                onPress={() => setOperatingHours(prev => ({
                                    ...prev,
                                    friday: { ...prev.friday, enabled: !prev.friday.enabled }
                                }))}
                            >
                                <View style={[
                                    dynamicStyles.dayToggleCircle,
                                    { alignSelf: operatingHours.friday.enabled ? 'flex-end' : 'flex-start' }
                                ]} />
                            </TouchableOpacity>
                        </View>

                        {/* Saturday */}
                        <View style={dynamicStyles.dayScheduleContainer}>
                            <Text style={dynamicStyles.dayName}>Saturday</Text>
                            <View style={dynamicStyles.timeInputsContainer}>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.saturday.open}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        saturday: { ...prev.saturday, open: text }
                                    }))}
                                    placeholder="09:00"
                                />
                                <Text style={dynamicStyles.timeSeparator}>to</Text>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.saturday.close}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        saturday: { ...prev.saturday, close: text }
                                    }))}
                                    placeholder="17:00"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    dynamicStyles.dayToggle,
                                    operatingHours.saturday.enabled && dynamicStyles.dayToggleActive
                                ]}
                                onPress={() => setOperatingHours(prev => ({
                                    ...prev,
                                    saturday: { ...prev.saturday, enabled: !prev.saturday.enabled }
                                }))}
                            >
                                <View style={[
                                    dynamicStyles.dayToggleCircle,
                                    { alignSelf: operatingHours.saturday.enabled ? 'flex-end' : 'flex-start' }
                                ]} />
                            </TouchableOpacity>
                        </View>

                        {/* Sunday */}
                        <View style={dynamicStyles.dayScheduleContainer}>
                            <Text style={dynamicStyles.dayName}>Sunday</Text>
                            <View style={dynamicStyles.timeInputsContainer}>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.sunday.open}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        sunday: { ...prev.sunday, open: text }
                                    }))}
                                    placeholder="09:00"
                                />
                                <Text style={dynamicStyles.timeSeparator}>to</Text>
                                <TextInput
                                    style={dynamicStyles.timeInput}
                                    value={operatingHours.sunday.close}
                                    onChangeText={(text) => setOperatingHours(prev => ({
                                        ...prev,
                                        sunday: { ...prev.sunday, close: text }
                                    }))}
                                    placeholder="17:00"
                                />
                            </View>
                            <TouchableOpacity
                                style={[
                                    dynamicStyles.dayToggle,
                                    operatingHours.sunday.enabled && dynamicStyles.dayToggleActive
                                ]}
                                onPress={() => setOperatingHours(prev => ({
                                    ...prev,
                                    sunday: { ...prev.sunday, enabled: !prev.sunday.enabled }
                                }))}
                            >
                                <View style={[
                                    dynamicStyles.dayToggleCircle,
                                    { alignSelf: operatingHours.sunday.enabled ? 'flex-end' : 'flex-start' }
                                ]} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Firm Description Section */}
                    <View style={dynamicStyles.firmDescriptionSection}>
                        <View style={dynamicStyles.firmDescriptionHeader}>
                            <Text style={dynamicStyles.firmDescriptionNumber}>6</Text>
                            <Documents2 width={getResponsiveValue(18, 20, 22)} height={getResponsiveValue(18, 20, 22)} />
                            <Text style={dynamicStyles.firmDescriptionTitle}>Firm Description</Text>
                        </View>
                        
                        <TextInput
                            style={dynamicStyles.firmDescriptionTextInput}
                            multiline
                            placeholder="Write about your firm"
                            placeholderTextColor={colors.secondary}
                            value={firmDescription}
                            onChangeText={setFirmDescription}
                            textAlignVertical="top"
                        />
                        
                        <View style={dynamicStyles.writingTipsContainer}>
                            <Text style={dynamicStyles.writingTipsTitle}>Writing Tips:</Text>
                            
                            <View style={dynamicStyles.tipItem}>
                                <Text style={dynamicStyles.tipNumber}>1</Text>
                                <Text style={dynamicStyles.tipText}>Highlight your unique approach to client service</Text>
                            </View>
                            
                            <View style={dynamicStyles.tipItem}>
                                <Text style={dynamicStyles.tipNumber}>2</Text>
                                <Text style={dynamicStyles.tipText}>Mention years of experience and notable achievements</Text>
                            </View>
                            
                            <View style={dynamicStyles.tipItem}>
                                <Text style={dynamicStyles.tipNumber}>3</Text>
                                <Text style={dynamicStyles.tipText}>Describe your firm's mission and values</Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={dynamicStyles.buttonsContainer}>
                        <TouchableOpacity 
                            style={dynamicStyles.saveDraftButton}
                            onPress={() => {
                                // Handle save as draft functionality
                                console.log('Save as Draft pressed');
                            }}
                        >
                            <Text style={dynamicStyles.saveDraftButtonText}>Save as Draft</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={dynamicStyles.submitButton}
                            onPress={() => {
                                // Handle submit functionality
                                console.log('Submit pressed');
                            }}
                        >
                            <Text style={dynamicStyles.submitButtonText}>Save Profile</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LawFirmProfileScreen;
