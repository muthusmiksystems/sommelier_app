
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DURATION = 600;

const DotLoader = () => {
  const animatedValues = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: DURATION,
            delay: index * 200,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]),
      ),
    );
    animations.forEach(anim => anim.start());

    return () => animations.forEach(anim => anim.stop());
  }, [animatedValues]);

  const dotTranslateY = animatedValues.map(animatedValue => ({
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10], // Move the dot up by 10 units
          extrapolate: 'clamp',
        }),
      },
    ],
  }));

  return (
    <View style={[styles.dotContainer, styles.row]}>
      {dotTranslateY.map((style, index) => (
        <Animated.View key={index} style={[styles.dot, style]} />
      ))}
    </View>
  );
};

const OverlayLoader = () => {
  return (
    <View style={styles.overlay}>
      <DotLoader />
    </View>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: '15%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    width: width * 0.5,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
  },
});

export default OverlayLoader;