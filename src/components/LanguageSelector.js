import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import i18n from '../i18n';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ur', name: 'اردو' },
];

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageSelect = (languageCode) => {
    changeLanguage(languageCode);
    setModalVisible(false);
  };

  const currentLanguageName = LANGUAGES.find(lang => lang.code === currentLanguage)?.name || 'English';

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.currentLanguageButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.languageText}>{currentLanguageName}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageButton,
                  currentLanguage === language.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <Text 
                  style={[
                    styles.languageText,
                    currentLanguage === language.code && styles.selectedLanguageText,
                  ]}
                >
                  {language.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  currentLanguageButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageButton: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedLanguage: {
    backgroundColor: '#007AFF',
  },
  selectedLanguageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 20,
    padding: 10,
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default LanguageSelector;
