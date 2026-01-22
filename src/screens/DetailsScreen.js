import React from 'react';
import { View, Text, StyleSheet, Button, Platform, SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Details Screen</Text>
          <Text style={styles.text}>This is the details screen. You've successfully navigated here!</Text>
          <Button
            title="Go back"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.space} />
          <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  space: {
    height: 10,
  },
});

export default DetailsScreen;
