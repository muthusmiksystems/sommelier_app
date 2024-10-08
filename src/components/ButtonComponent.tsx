import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

interface ButtonComponentProps {
  placeHolder: string;
  onPress?: () => void;
}
const ButtonComponent: React.FC<ButtonComponentProps> = ({
  placeHolder,
  onPress,
}) => {
  return (
    // <View style={styles.mainStyle}>
      <TouchableOpacity onPress={onPress} style={styles.mainStyle}>
        <View style={styles.buttonStyle}>
          <Text style={styles.fontStyle}>{placeHolder}</Text>
        </View>
      </TouchableOpacity>
    // </View>
  );
};
const styles = StyleSheet.create({
  mainStyle: {
    backgroundColor: '#FC8019',
    alignSelf: 'center',
    width: '80%',
    height: 50,
    marginTop:'5%',
    borderRadius: 6,
  },
  touchStyle: {
    alignSelf: 'center',
    width: '80%',
    height: '100%',
  },
  buttonStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FC8019',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontStyle: {color: 'white', fontSize: 20},
});
export default ButtonComponent;
