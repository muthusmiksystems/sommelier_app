import React from 'react';
import { View, StyleSheet } from 'react-native';

const ZigzagBorder = () => {
  return <View style={styles.zigzag} />;
};

const styles = StyleSheet.create({
  zigzag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  zigzagPattern: {
    position: 'absolute',
    top: 0,
    width: '200%',
    height: '200%',
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'transparent',
    borderColor: '#f4f4f5',
    borderWidth: 7,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

export default ZigzagBorder;
