import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

interface PhoneInputComponentProps {
  onChangeFormattedText: (arg: string) => void;
  defaultNumber: string;
  autoFocus: boolean;
  hasError: string;
  disabled?: boolean;
  color?: string;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({
  onChangeFormattedText,
  defaultNumber,
  autoFocus,
  hasError,
  disabled,
  color,
}) => {
  const defaultCountryCode = '+61'; // Change this to your desired default country code
  const [phoneNumber, setPhoneNumber] = useState(defaultNumber || '');

  // Function to handle phone number change
  const handlePhoneNumberChange = (value: string) => {
    // Remove all non-digit characters from the input
    const formattedPhoneNumber = value.replace(/\D/g, '');


    // Update state with the formatted phone number
    setPhoneNumber(formattedPhoneNumber);

    // Call the callback function with the formatted phone number
    onChangeFormattedText(formattedPhoneNumber);
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.countryContainer}>
          <Image source={require('../assets/images/aus1.png')} style={styles.flagIcon} />
          <Text style={styles.countryCode}>{defaultCountryCode}</Text>
        </View>
        <TextInput
          placeholder="Phone"
          value={  phoneNumber}
          onChangeText={handlePhoneNumberChange}
          style={[styles.textInputStyle, { backgroundColor: color }]}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="black"
          editable={!disabled}
          autoFocus={autoFocus}
        />
      </View>
      {hasError && <Text style={styles.errorText}>{hasError}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 57,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.6,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRightWidth: 0.6,
    borderRightColor: 'gray',
    backgroundColor: 'white'
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
    color: 'black',
  },
  textInputStyle: {
    flex: 1,
    height: 54,
    color: 'black',
    paddingHorizontal: 10,
  },
  errorText: {
    width: '100%',
    alignSelf: 'center',
    fontSize: 12,
    marginLeft: 10,
    color: 'red',
  },
});

export default PhoneInputComponent;
