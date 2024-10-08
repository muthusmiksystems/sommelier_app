import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ToastAndroid,
  Text,
  Keyboard,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneInputComponent from '../components/PhoneNumberInput';
import LoginWithGoogle from '../components/LoginWithGoogle';
import TextInputComponent from '../components/TextInput';
import ButtonComponent from '../components/ButtonComponent';
import OverlayLoader from '../components/OverlayLoader';
import { emailPattern, passwordPattern } from '../assets/patterns/regrex';
import parsePhoneNumber from 'libphonenumber-js';
import AuthTopStyleComponent from '../components/AuthTopStyleComponent';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import { registerServiceHandler } from '../store/services/registerService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginOtpHandler, logindetails, registerOtpHandler } from '../store/services/loginService';
import { paylod } from 'assets/constantsDummy';
import { saveAddressServiceHandler } from '../store/services/SaveAddressService';
import auth from '@react-native-firebase/auth';
import { logindeviceInfoServiceHandler } from '../store/services/SaveLoginDeviceInfoService';
function RegistrationScreen(): React.JSX.Element {
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState({})
  const navigation = useNavigation();
  const [restaurentId, setrestaurentId] =useState<string | null>(null);
  
  const fetchRestaurantId = async () => {
    try {
      let data = await AsyncStorage.getItem('RestaurentId');
      setrestaurentId(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch restaurantId from AsyncStorage', error);
    }
  };
  useEffect(() => {
    fetchRestaurantId();
  }, []);
  const [registerDetails, setRegisterDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
    password: '',
    storeId: restaurentId,
    register: true
  });
  useEffect(() => {


    setRegisterDetails({ ...registerDetails, storeId: restaurentId });
  }, [restaurentId]);
  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
    password: '',

  });
  const isDarkMode = useColorScheme() === 'dark';
  const mergedData = {}
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let phoneInputCountryCode = 'AU';
  let phoneInputMobileNumber = '04';
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
    setRegisterDetails({ ...registerDetails, phone: text });
    setError({ ...error, phone: '' });
  };
  const isValidPhoneNumber = (phoneNumber: string) => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
      const prefix = phoneNumber.slice(0, 2); // Extract the prefix "+61"
      const remainingNumber = phoneNumber;
      return (
        remainingNumber.length === 10 &&
        remainingNumber.startsWith('04')
      );
    } catch (error) {
      return false;
    }
  };
  const handleValidation = () => {
    const errors = {};
    if (!registerDetails.first_name) {
      errors.first_name = 'First name is required';
    } else if (registerDetails.first_name?.length < 3) {
      errors.first_name = 'First name should have minimum 3 characters';
    }
    if (!registerDetails.last_name) {
      errors.last_name = 'Last name is required';
    } else if (registerDetails.last_name?.length < 3) {
      errors.last_name = 'Last name should have minimum 3 characters';
    }
    if (!registerDetails.email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(registerDetails.email)) {
      errors.email = 'Invalid email format';
    }
    // if (!registerDetails.address) {
    //   errors.address = 'Address is required';
    // } else if (registerDetails.address?.length < 8) {
    //   errors.address = 'Address should have minimum 8 characters';
    // }
    if (!registerDetails.dob) {
      errors.dob = 'Date of birth is required';
    } 
    if (!registerDetails.phone) {
      errors.phone = 'Mobile number is required';
    } else if (registerDetails.phone.length !=10) {
      errors.phone = 'Please enter valid mobile number';
    }
    else if (!isValidPhoneNumber(registerDetails.phone)) {
      errors.phone = 'Please enter a valid mobile number starting with 04';
    }
    // if (!registerDetails.password) {
    //   errors.password = 'Password is required';
    // } else if (!passwordPattern.test(registerDetails.password)) {
    //   errors.password =
    //     'Password should have minimum 8 characters with combination of alphabets, numbers and special characters.';
    // }
    setError(errors);
    return errors;
  };
  // const postDeviceInfo = (id: any,originalData:any) => {
  //   console.log("deviceinfo fcm tokem",originalData.id)
  //   const data={
  //     "push_token":id,
  //     "id":originalData?.id
  //   }
  //   dispatch(logindeviceInfoServiceHandler(data)) // Dispatching the Redux action
  //     .then((originalPromiseResult: any) => {
  //     })
  //     .catch((err: any) => {
  //       console.log("erroriginalPromiseResult", err);
  //     })
  //     return;
  // }
  const handleRegisterFunction = async () => {
    Keyboard.dismiss;
    const validation = handleValidation();

    if (Object.keys(validation).length === 0) {
      // try {
      setLoader(true)

      // const response = await RegisterServices(registerDetails)
      const data = fetchRestaurantId()
      setRegisterDetails({ ...registerDetails, storeId: data });
      dispatch(registerOtpHandler(registerDetails)).then(async (originalPromiseResult: any) => {
        // const originalData = originalPromiseResult?.payload?.data?.data;
        // setData(originalData);
        if (originalPromiseResult.payload.otp) {
          // const addressdetails = {
          //   address: registerDetails.address,
          //   id: originalData.id // Assuming data.id represents the user's ID
          // };
          // if (registerDetails.address) {
          //   dispatch(saveAddressServiceHandler(addressdetails)).then(async (addresspayload: any) => {
          //     console.log("adresssssss", addresspayload.payload)
          //     let mergedData = { ...originalData, ...addresspayload.payload };
          //     setData(mergedData);
          //   })
          // }
          // else{
          //   let mergedData = { ...originalData };
          //     setData(mergedData);
          // }
          // let fcmtoken = await AsyncStorage.getItem('fcmtoken');
          // postDeviceInfo(fcmtoken,originalData);
          await AsyncStorage.setItem(
            'UserOtp',
            JSON.stringify(originalPromiseResult.payload),
          );
          setLoader(false);

          // dispatch(logindetails(mergedData))
          ToastAndroid.showWithGravity("Otp send succesfully", ToastAndroid.CENTER, ToastAndroid.LONG);
          navigation.navigate('Otpscreen', { loginDetails: registerDetails, page: 'register' });
        }
        else if (originalPromiseResult.payload.status === 201 && originalPromiseResult.payload.data.success === false) {
          ToastAndroid.showWithGravity(originalPromiseResult.data.success, ToastAndroid.CENTER, ToastAndroid.LONG)
          setLoader(false)
        }
        else if (originalPromiseResult.payload.status === 200 && originalPromiseResult.payload.data.email_phone_already_used === true) {
          ToastAndroid.showWithGravity("User already registered with us!", ToastAndroid.CENTER, ToastAndroid.LONG)
          navigation.pop(1);
          setLoader(false)
        }
        else if (originalPromiseResult.payload.email_phone_already_used === true) {
          ToastAndroid.showWithGravity("User already registered with us!", ToastAndroid.CENTER, ToastAndroid.LONG)
          navigation.pop(1);
          setLoader(false)
        }
        else {
          ToastAndroid.showWithGravity("Something went wrong, Please try again later!", ToastAndroid.CENTER, ToastAndroid.LONG)
          setLoader(false)
        }
      })
      // }
      // catch (error) {
      //   console.error("Error in register...............", error);
      // }
      // finally {
      //   setLoader(false);
      // }
    }
    else {
      setLoader(false)
    }
  };
  // useEffect(() => {
  //   console.log("useEdffdata", data)
  //   dispatch(logindetails(data))
  // }, [data])
  const handleGoogleLoginSuccess = (phoneNumber: string) => {
    const errors = {};
    if (!registerDetails.phone) {
      errors.phone = 'Mobile number is required';
      return false;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      errors.phone = 'Invalid mobile number format. Please enter Australian mobile number starting with 04 (e.g., +61 412345678)';
      return false
    }
    return true;
    setRegisterDetails({ ...registerDetails, phone: phoneNumber });
  };
  const [verificationId, setVerificationId] = useState('');
  const handleSendOTP = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(registerDetails.phone);
      setVerificationId(confirmation?.verificationId);
      // OTP sent, proceed to OTP verification screen or wait for user input
    } catch (error) {
      console.log('Error sending OTP: ', error);
      // Handle error (e.g., display error message to the user)
    }
  };
  return (
    <KeyboardAvoidingView style={styles.mainStyle} >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {loader && <OverlayLoader />}
      <AuthTopStyleComponent title='Registration' subTitle='Regsiter now for free' />

      < ScrollView style={styles.scrollViewStyle} >
        <View style={styles.subViewTwoStyle}>
          <View>
            <TextInputComponent
              placeholder={'First name'}
              style={styles.textInputStyle}
              value={registerDetails.first_name}
              onChangeText={(text: any) => {
                setRegisterDetails({ ...registerDetails, first_name: text });
                setError({ ...error, first_name: '' })
              }}
              hasError={error.first_name}
            />
          </View>
          <View>
            <TextInputComponent
              placeholder={'Last name'}
              style={styles.textInputStyle}
              value={registerDetails.last_name}
              onChangeText={(text: any) => {
                setRegisterDetails({ ...registerDetails, last_name: text });
                setError({ ...error, last_name: '' })
              }}
              hasError={error.last_name}
            />
          </View>
          < View >
            <TextInputComponent
              placeholder={'Email'}
              style={styles.textInputStyle}
              value={registerDetails.email}
              onChangeText={(text: any) => {
                setRegisterDetails({ ...registerDetails, email: text });
                setError({ ...error, email: '' })
              }}
              hasError={error.email}
            />
          </View>
          {/* < View >
            <TextInputComponent
              placeholder={'Address'}
              style={styles.textInputStyle}
              value={registerDetails.address}
              onChangeText={(text: any) => {
                setRegisterDetails({ ...registerDetails, address: text });
                setError({ ...error, address: '' })
              }}
              hasError={error.address}
            />
          </View> */}
           < View >
      <TextInputComponent
        placeholder={'Date of Birth'}
        style={styles.textInputStyle}
        value={registerDetails.dob}
        onChangeText={(text: any) => {
          setRegisterDetails({ ...registerDetails, dob: text });
          setError({ ...error, dob: '' })
        }}
        hasError={error.dob}
      />
    </View>
          < View style={{ width: '80%', alignSelf: 'center' }}>
            <PhoneInputComponent
              defaultNumber={phoneInputMobileNumber}
              defaultCode={phoneInputCountryCode}
              onChangeFormattedText={handlePhoneNumberChange}
              autoFocus={false}
              disabled={false}
              color={'#fff'}
              hasError={error.phone}
            />
          </View>
          {/* < View >
            <TextInputComponent
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.textInputStyle}
              value={registerDetails.password}
              onChangeText={(text: any) => {
                setRegisterDetails({ ...registerDetails, password: text });
                setError({ ...error, password: '' })
              }}
              hasError={error.password}
            />
          </View> */}
          {/* <TouchableOpacity onPress={() => handleRegisterFunction()} style={styles.loginbuttonstyle}> */}
          < ButtonComponent
            style={styles.loginbuttonstyle}
            // onPress={() => { }}
            onPress={() => handleRegisterFunction()}
            placeHolder="REGISTER"
          />
          {/* </TouchableOpacity> */}
          <Text
            style={
              {
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                color: "black",
                padding: '0%'
              }
            }>
            -- OR --
            < /Text>
            < LoginWithGoogle page={'register'} onGoogleLoginSuccess={handleGoogleLoginSuccess} mobile={registerDetails.phone} />
            <View
              style={
                {
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: "8%"
                }
              }>
              <Text style={{ color: "black", fontSize: 18 }}>Already have an account? </Text>
              < TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#FC8019', fontSize: 18 }}> Login < /Text>
                  < /TouchableOpacity>
                  < /View>
                  < /View>
                  < /ScrollView>
                  < /KeyboardAvoidingView>
                  );
}

                  const styles = StyleSheet.create({
                    mainStyle: {
                    width: '100%',
                  height: '100%',
  },
                  scrollViewStyle: {
                    width: '100%',
                  height: '80%',
                  backgroundColor: 'white',
  },
                  subViewTwoStyle: {
                    width: '100%',
                  height: '80%',
                  paddingVertical: '8%',
                  backgroundColor: 'white',
                  gap: 20,
  },
                  textInputStyle: {
                    alignSelf: 'center',
                  width: '80%',
                  height: 54,
                  paddingHorizontal: 14,
                  fontSize: 16,
                  color: 'black',
                  borderColor:"gray",
                  borderWidth:0.5,
                  borderRadius: 6,
                  backgroundColor: '#fff',
  },
                  loginbuttonstyle: {
                    width: '100%',
                  alignItems: 'center',
                  // opacity:100,
                  marginTop: 100,
  },
});

                  export default RegistrationScreen;
