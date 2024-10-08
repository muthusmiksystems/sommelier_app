import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ToastAndroid, Platform, Modal, Button } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import loginService, { loginOtpHandler, loginServiceHandler } from '../store/services/loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerServiceHandler } from '../store/services/registerService';
import { logindetails } from '../store/services/loginService'
import TextInputComponent from './TextInput';
import PhoneInputComponent from './PhoneNumberInput';
import { parsePhoneNumber } from 'libphonenumber-js';
import ButtonComponent from './ButtonComponent';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { logindeviceInfoServiceHandler } from '../store/services/SaveLoginDeviceInfoService';
GoogleSignin.configure({
  // Add your Google Web Client ID here
  webClientId: '589807182472-b232tgrdquimtd1lfu45gbr61vlrccl6.apps.googleusercontent.com',
  scopes: ['profile', 'email', 'openid'],
});

interface LoginWithGoogleProps {
  page: string;
  onGoogleLoginSuccess: (phoneNumber: string) => void;
  mobile: any;
}

const LoginWithFacebook: React.FC<LoginWithGoogleProps> = ({ page, onGoogleLoginSuccess, mobile }) => {
  const dispatch = useDispatch()
  const [restaurentId, setrestaurentId] =useState<string | null>(null);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  // const [loginDetails, setLoginDetails] = useState({ email: '' });
  // const [registerDetails, setRegisterDetails] = useState({ first_name: '', last_name: '', email: '', })
  const [error, setError] = useState({ email: '', password: '' });
  const [openModal, setModal] = useState(false)
  const [phone, setPhone] = useState('')
  let phoneInputCountryCode = 'AU';
  let phoneInputMobileNumber = '';
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
  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        let data = await AsyncStorage.getItem('RestaurentId');
        setrestaurentId(data);
      } catch (error) {
        console.error('Failed to fetch restaurantId from AsyncStorage', error);
      }
    };

    fetchRestaurantId();
  }, []);
  const handleSubmit = () => {
    setLoader(true)
    if (isValidPhoneNumber(phone)) {
      // Close the modal
      setLoader(false)
      setModal(false);
      // mobile(phone)
      signInWithGoogle()
      // Call the onGoogleLoginSuccess function with the submitted phone number
      // onGoogleLoginSuccess(phoneInputMobileNumber);
    } else {
      setLoader(false)
      setError({ ...error, phone: 'Invalid phone number' });
    }
  };
  const handlePhoneNumberChange = (text: any) => {
    // setRegisterDetails({ ...registerDetails, phone: text });
    setPhone(text)
    isValidPhoneNumber(text)
    setError({ ...error, phone: '' });
  };
  const isValidPhoneNumber = (phoneNumber: string) => {
    try {
      const prefix = phoneNumber.slice(0, 2); // Extract the prefix "+61"
      const remainingNumber = phoneNumber;
      if (
        remainingNumber.length === 10 &&
        remainingNumber.startsWith('04')
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };
  const postDeviceInfo = (id: any, originalData: any) => {
    const data = {
      "push_token": id,
      "id": originalData?.id
    }
    dispatch(logindeviceInfoServiceHandler(data)) // Dispatching the Redux action
      .then((originalPromiseResult: any) => {
      })
      .catch((err: any) => {
        console.log("erroriginalPromiseResult", err);
      })
    return;
  }
  const signInWithGoogle = async () => {
    try {

      // dataset(userInfo)
      if (page === 'login') {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
          throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Log the Facebook credential object

        // Continue with your logic here (dispatch actions, navigate, etc.)
      }
      else if (page === 'register') {
        // await GoogleSignin.clearCachedAccessToken;
        // if (onGoogleLoginSuccess(mobile)) {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // const clear = await GoogleSignin.signOut();
        // setLoader(true)
        const registerDetails = {
          first_name: userInfo.user.name,
          last_name: userInfo.user.givenName,
          email: userInfo.user.email,
          loginType: 'google',
          phone: phone,
          storeId: restaurentId,
          register: true
        };
        // const response = await RegisterServices(registerDetails)
        dispatch(loginOtpHandler(registerDetails)).then(async (originalPromiseResult: any) => {
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
            // console.log("mergedData====", mergedData)

            // dispatch(logindetails(mergedData))
            const clear = await GoogleSignin.signOut();
            ToastAndroid.showWithGravity("Otp send succesfully", ToastAndroid.CENTER, ToastAndroid.LONG);
            setLoader(false);

            navigation.navigate('Otpscreen', { loginDetails: registerDetails, page: 'register' });
          }
          else if (originalPromiseResult.payload.status === 201 && originalPromiseResult.payload.data.success === false) {
            ToastAndroid.showWithGravity(originalPromiseResult.data.success, ToastAndroid.CENTER, ToastAndroid.LONG)
            setLoader(false)
          }
          else if (originalPromiseResult.payload.status === 200 && originalPromiseResult.payload.data.email_phone_already_used === true) {
            ToastAndroid.showWithGravity("User already registered with us!", ToastAndroid.CENTER, ToastAndroid.LONG)
            const clear = await GoogleSignin.signOut();
            navigation.pop(1);
            setLoader(false)
          }
          else if (originalPromiseResult.payload.email_phone_already_used === true) {
            ToastAndroid.showWithGravity("User already registered with us!", ToastAndroid.CENTER, ToastAndroid.LONG)
            const clear = await GoogleSignin.signOut();
            navigation.pop(1);
            setLoader(false)
          }
          else if (originalPromiseResult.payload.status === 200 && originalPromiseResult.payload.data.enter_phone_after_social_login === true) {
            ToastAndroid.showWithGravity("enter_phone_after_social_login!", ToastAndroid.CENTER, ToastAndroid.LONG)
            // navigation.pop(1);
            // const clear = await GoogleSignin.signOut();
            setModal(true)
            setLoader(false)
          }
          else if (originalPromiseResult.payload.success === false && originalPromiseResult.payload.enter_phone_after_social_login === true) {
            ToastAndroid.showWithGravity("enter_phone_after_social_login!", ToastAndroid.CENTER, ToastAndroid.LONG)
            // navigation.pop(1);
            // const clear = await GoogleSignin.signOut();
            setModal(true)
            setLoader(false)
          }
          else {
            ToastAndroid.showWithGravity("Something went wrong, Please try again later!", ToastAndroid.CENTER, ToastAndroid.LONG)
            setLoader(false)
            const clear = await GoogleSignin.signOut();
          }
        }).catch(async (error: any) => {
          ToastAndroid.showWithGravity("Something went wrong, Please try again later!", ToastAndroid.CENTER, ToastAndroid.LONG)
          setLoader(false)
          // const clear = await GoogleSignin.signOut();
          const clear = await GoogleSignin.signOut();
          console.log(error)
        })
        // const clear = await GoogleSignin.signOut();
        // }
        // else {
        //   ToastAndroid.showWithGravity("Please Enter Mobile Number!", ToastAndroid.CENTER, ToastAndroid.LONG)
        //   setLoader(false)
        // }
      }

    } catch (error:any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available or outdated');
      } else {
        console.log('Something went wrong:', error);
      }
    }
  };

  return (
    <View style={styles.mainViewStyle}>
      <TouchableOpacity onPress={signInWithGoogle} style={styles.touchableOpacityStyle}>
        <View style={styles.subViewStyle}>
          <View style={styles.imageViewStyle}>
            <Image
              source={require('../assets/images/facebook.png')}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.wordingViewStyle}>
            <Text style={styles.fontStyle}>FaceBook</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal visible={openModal} animationType="slide" transparent={true} onRequestClose={() => setModal(false)}>
        <TouchableOpacity onPress={() => setModal(false)} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Phone Number</Text>
            <PhoneInputComponent
              defaultNumber={phoneInputMobileNumber}
              defaultCode={phoneInputCountryCode}
              onChangeFormattedText={handlePhoneNumberChange}
              autoFocus={false}
              disabled={false}
              color={'#fff'}
              hasError={!!error.phone}
            />
            {error.phone && <Text style={styles.errorText}>{error.phone}</Text>}
            <View style={{ marginBottom: 20 }} />
            <ButtonComponent
              placeHolder="SUBMIT"
              onPress={handleSubmit}
            />
          </View>
        </TouchableOpacity>
      </Modal>



    </View>

  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    alignSelf: 'center',
    borderWidth: 0.6,
    borderRadius: 6,
    width: '78%',
    height: 50,
    borderColor: 'grey',
  },
  touchableOpacityStyle: {
    width: '100%',
    height: '100%',
  },
  subViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  imageViewStyle: {
    width: '15%',
    height: '68%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageStyle: { width: '100%', height: '100%' },
  fontStyle: { fontSize: 16, color: '#fff', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  wordingViewStyle: {
    width: '85%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "#4082ED",
    borderTopRightRadius: 6, // Radius for top-right corner
    borderBottomRightRadius: 6, // Radius for bottom-right corner
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginbuttonstyle: {
    width: '100%',
    alignItems: 'center',
    opacity: 100,
    marginTop: 20,
  },
});

export default LoginWithFacebook;
