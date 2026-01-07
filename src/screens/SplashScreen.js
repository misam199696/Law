import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const scaleValue = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Start the animation
    const animate = () => {
      Animated.sequence([
        // Scale up
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        // Scale down
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        })
      ]).start(() => {
        // After animation completes, navigate to Login screen after a delay
        setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
      });
    };

    // Start the animation
    animate();

    // Clean up animation on unmount
    return () => scaleValue.setValue(0.5);
  }, [navigation, scaleValue]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View 
        style={[
          styles.logoContainer, 
          { 
            transform: [{ scale: scaleValue }],
          }
        ]}
      >
        <Image 
          source={require('../assets/images/Icon.png')} 
          style={[styles.logo, { tintColor: colors.primary }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
