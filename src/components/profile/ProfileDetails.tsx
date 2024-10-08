import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextInputComponent from '../TextInput';
import PhoneInputComponent from '../PhoneNumberInput';
import parsePhoneNumber from 'libphonenumber-js';
import {metrices} from '../../assets/metrices';

interface ProfileDetailsProps {
  registerDetails: {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    phone: string;
    dob:string;
  };
  setRegisterDetails: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
      address: string;
      phone: string;
      dob:string;
    }>
  >;
  error: {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    phone: string;
    dob:string;
  };
  setError: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
      address: string;
      phone: string;
      dob:string;
    }>
  >;
  edit: number;
  setEdit: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  registerDetails,
  setRegisterDetails,
  error,
  setError,
  edit,
  setEdit,
}) => {
  let phoneInputCountryCode = '';
  let phoneInputMobileNumber = registerDetails?.phone;
  let phoneNumber = '';
  if (phoneInputMobileNumber) {
    let numberForInput = phoneInputMobileNumber || '';
    const parsedPhoneNumber = parsePhoneNumber(numberForInput);

    if (parsedPhoneNumber) {
      phoneNumber = parsedPhoneNumber.formatInternational();
      phoneInputCountryCode = parsedPhoneNumber.country;
      phoneInputMobileNumber = parsedPhoneNumber.nationalNumber;
      // setPhoneInputMobileNumber(phoneInputMobileNumber)
    }
  }

  const handlePhoneNumberChange = (text: any) => {
    setRegisterDetails({...registerDetails, phone: text});
    setError({...error, phone: ''});
  };

  return (
    <View style={{gap: 14, marginTop: 18}}>
      <View>
        <TextInputComponent
          placeholder={'First Name'}
          editable={edit === 0 ? false : true}
          style={styles.textInputStyle}
          value={registerDetails.first_name}
          onChangeText={(text: any) => {
            setRegisterDetails({...registerDetails, first_name: text});
            setError({...error, first_name: ''});
          }}
          hasError={error.first_name}
        />
      </View>
      <View>
        <TextInputComponent
          placeholder={'Last Name'}
          editable={edit === 0 ? false : true}
          style={styles.textInputStyle}
          value={registerDetails.last_name}
          onChangeText={(text: any) => {
            setRegisterDetails({...registerDetails, last_name: text});
            setError({...error, last_name: ''});
          }}
          hasError={error.last_name}
        />
      </View>
      <View>
        <TextInputComponent
          placeholder={'Email'}
          editable={edit === 0 ? false : false}
          style={styles.textInputStyle}
          value={registerDetails.email}
          onChangeText={(text: any) => {
            setRegisterDetails({...registerDetails, email: text});
            setError({...error, email: ''});
          }}
          hasError={error.email}
        />
      </View>
      <View>
        <TextInputComponent
          placeholder={'Date of Birth'}
          editable={edit === 0 ? false : true}
          style={styles.textInputStyle}
          value={registerDetails.dob}
          onChangeText={(text: any) => {
            setRegisterDetails({...registerDetails, dob: text});
            setError({...error, dob: ''});
          }}
          hasError={error.dob}
        />
      </View>
      <View>
        <TextInputComponent
          placeholder={'Address'}
          editable={edit === 0 ? false : true}
          style={styles.textInputStyle}
          value={registerDetails.address}
          onChangeText={(text: any) => {
            setRegisterDetails({...registerDetails, address: text});
            setError({...error, address: ''});
          }}
          hasError={error.address}
        />
      </View>
      <View style={{width: '80%', alignSelf: 'center'}}>
        <PhoneInputComponent
          defaultNumber={phoneInputMobileNumber}
          defaultCode={phoneInputCountryCode}
          onChangeFormattedText={handlePhoneNumberChange}
          autoFocus={false}
          disabled={edit === 0 ? true : false}
          color={'white'}
          hasError={error.phone}
        />
      </View>
      <View style={{height: metrices(2)}} />
    </View>
  );
};
const styles = StyleSheet.create({
  textInputStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 54,
    paddingHorizontal: 14,
    fontSize: 16,
    color: 'black',
    borderRadius: 6,
    backgroundColor: 'white',
  },
});
export default ProfileDetails;
