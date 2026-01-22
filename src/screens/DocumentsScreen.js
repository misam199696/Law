import React from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const DocumentsScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Documents</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>Your documents and files</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 85, // Add padding for bottom tab bar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
});

export default DocumentsScreen;
