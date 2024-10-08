import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  ToastAndroid,
  View,
  Modal,
} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import TextInputComponent from '../components/TextInput';
import LoginWithGoogle from '../components/LoginWithGoogle';
import ButtonComponent from '../components/ButtonComponent';
import { loginOtpHandler, loginServiceHandler, logindetails } from '../store/services/loginService';
import { metrices } from '../assets/metrices';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FaceIDAuth from '../components/FaceIDAuth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { logindeviceInfoServiceHandler } from '../store/services/SaveLoginDeviceInfoService';
import AuthTopStyleComponent from '../components/AuthTopStyleComponent';
import { registerServiceHandler } from '../store/services/registerService';
import { saveAddressServiceHandler } from '../store/services/SaveAddressService';
import OverlayLoader from '../components/OverlayLoader';

function LoginScreen(): React.JSX.Element {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ otp: '' });
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const page = route?.params?.page;
  const [data, setData] = useState({});
  const loginDetailsFromParams = route?.params?.loginDetails;
  const [loginDetailsFrom, setLoginDetailsFrom] = useState(loginDetailsFromParams);
  const inputRefs = useRef([]);

  const backgroundStyle = {
    backgroundColor: useColorScheme() === 'dark' ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      inputRefs.current[0].focus();
      setOtp('');
    }
  }, [timer]);

  useFocusEffect(
    React.useCallback(() => {
      setLoginDetails({ otp: '' });
    }, []),
  );

  const handleValidation = () => {
    const errors = {};
    if (!loginDetails.otp) {
      errors.otp = 'Otp is required';
    } else if (loginDetails.otp.length !== 6) {
      errors.otp = 'Invalid otp';
    }
    return errors;
  };

  const postDeviceInfo = (id: any, originalData: any) => {
    const data = {
      push_token: id,
      id: originalData?.id,
    };
    dispatch(logindeviceInfoServiceHandler(data))
      .then((originalPromiseResult: any) => { })
      .catch((err: any) => {
        console.log('erroriginalPromiseResult', err);
      });
  };

  const handleLoginFunction = async () => {
    setLoader(true)
    const validation = handleValidation();

    if (Object.keys(validation).length === 0) {

      const userDetails = { ...loginDetailsFrom, otp: otp };
      if (page === 'login') {
        dispatch(loginServiceHandler(userDetails)).then(async (originalPromiseResult: any) => {
          if (originalPromiseResult?.payload?.success === true) {
            const originalData = originalPromiseResult?.payload?.data;
            
            await AsyncStorage.setItem('UserToken', JSON.stringify(originalPromiseResult.payload.data));
            ToastAndroid.showWithGravity('User logged in successfully', ToastAndroid.CENTER, ToastAndroid.LONG);
            
            dispatch(logindetails(originalPromiseResult?.payload?.data));
            let fcmtoken = await AsyncStorage.getItem('fcmtoken');
            postDeviceInfo(fcmtoken, originalData);
            navigation.navigate('HomeDrawerPage');
          } else if (originalPromiseResult?.payload?.success === false && originalPromiseResult?.payload?.data.Otp_not_match === true) {
            setLoader(true)
            ToastAndroid.showWithGravity(originalPromiseResult.payload.data, ToastAndroid.CENTER, ToastAndroid.LONG);
            
          } else if (originalPromiseResult?.payload?.success === false) {
            ToastAndroid.showWithGravity(originalPromiseResult.payload.data, ToastAndroid.CENTER, ToastAndroid.LONG);
            
          } else {
            ToastAndroid.showWithGravity('Something went wrong, Please try again later!', ToastAndroid.CENTER, ToastAndroid.LONG);
            
          }
        });
      } else if (page === 'register') {
        dispatch(registerServiceHandler(userDetails)).then(async (originalPromiseResult: any) => {
          if (originalPromiseResult?.payload?.status === 201 && originalPromiseResult?.payload?.data.success === true) {
            const originalData = originalPromiseResult?.payload?.data?.data;
            ToastAndroid.showWithGravity('User registered successfully', ToastAndroid.CENTER, ToastAndroid.LONG);
            let fcmtoken = await AsyncStorage.getItem('fcmtoken');
            postDeviceInfo(fcmtoken, originalData);
            await AsyncStorage.setItem('UserToken', JSON.stringify(originalData));
            setLoader(false);
            dispatch(logindetails(originalData));
            navigation.navigate('HomeDrawerPage');
          } else if (originalPromiseResult?.payload?.status === 201 && originalPromiseResult?.payload?.data.success === false) {
            ToastAndroid.showWithGravity(originalPromiseResult.data.success, ToastAndroid.CENTER, ToastAndroid.LONG);
            setLoader(false);
          } else if (originalPromiseResult?.payload?.data?.success === false && originalPromiseResult?.payload?.data?.data === 'Otp_not_match') {
            ToastAndroid.showWithGravity('Otp not match', ToastAndroid.CENTER, ToastAndroid.LONG);
            setLoader(false);
          } else if (originalPromiseResult?.payload?.status === 200 && originalPromiseResult?.payload?.data.email_phone_already_used === true) {
            ToastAndroid.showWithGravity('User already registered with us!', ToastAndroid.CENTER, ToastAndroid.LONG);
            navigation.pop(1);
            setLoader(false);
          } else {
            ToastAndroid.showWithGravity('Something went wrong, Please try again later!', ToastAndroid.CENTER, ToastAndroid.LONG);
            setLoader(false);
          }
        });
      }
    } else {

      setLoader(false);
    }
    setLoader(false);
  };
useEffect(()=>{
  if(loginDetails.otp.length === 6){
    setLoader(true)
    handleLoginFunction();
  }
},[loginDetails])
const handleOtpChange = (text, index) => {
  const newOtp = otp.split('');
  newOtp[index] = text;
  setOtp(newOtp.join(''));
  setLoginDetails({ ...loginDetails, otp: newOtp.join('') });

  if (text && index < 5) {
    inputRefs.current[index + 1].focus();
  } else if (!text && index > 0) {
    inputRefs.current[index - 1].focus();
  }
  
};

  const handlePinModalClose = () => {
    setShowPinModal(false);
  };

  const handleFaceModalOpen = () => {
    setShowFaceModal(true);
  };

  const handleFaceModalClose = () => {
    setShowFaceModal(false);
  };

  const handleResendOTP = () => {
    setLoader(true);
    dispatch(loginOtpHandler(loginDetailsFrom)).then(async (originalPromiseResult: any) => {
      const originalData = originalPromiseResult;
      if (originalPromiseResult?.payload?.otp) {
        setLoader(false);
        await AsyncStorage.setItem('UserOtp', JSON.stringify(originalPromiseResult.payload));
        ToastAndroid.showWithGravity('Otp send successfully', ToastAndroid.CENTER, ToastAndroid.LONG);
        setLoader(false);
        navigation.navigate('Otpscreen', { loginDetails: loginDetails, page: 'login' });
      } else {
        ToastAndroid.showWithGravity('Something went wrong, Please try again later!', ToastAndroid.CENTER, ToastAndroid.LONG);
        setLoader(false);
      }
    });
    setTimer(60);
  };

  return (
    <KeyboardAvoidingView style={styles.mainStyle}>
      <StatusBar barStyle={backgroundStyle.backgroundColor === Colors.darker ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      {loader && <OverlayLoader />}
      <AuthTopStyleComponent title="Verification Otp" subTitle="Enter your Verification OTP" />
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.title}>Enter Verification OTP</Text>
        <View style={styles.otpContainer}>
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              style={styles.inputBox}
              maxLength={1}
              value={otp[index] || ''}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="numeric"
              ref={(input) => {
                inputRefs.current[index] = input;
              }}
            />
          ))}
        </View>
        <Text style={styles.timer}>{timer} seconds left</Text>
        <ButtonComponent onPress={handleLoginFunction} placeHolder={'VERIFY'} />
        <Text style={{ color: 'black', fontSize: 18, textAlign: 'center', marginTop: 40 }}>Otp has been sent to your registered email</Text>
        <View style={styles.dontHaveAccStyle}>
          <Text style={{ color: 'black', fontSize: 18 }}>Didn't get a code </Text>
          <TouchableOpacity onPress={() => handleResendOTP()}>
            <Text style={{ color: '#FC8019', fontSize: 18 }}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={showPinModal} animationType="slide" transparent={true} onRequestClose={handlePinModalClose}>
        {/* Your modal content */}
      </Modal>
      <Modal visible={showFaceModal} animationType="slide" transparent={true} onRequestClose={handleFaceModalClose}>
        {/* Your modal content */}
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center',
  },
  scrollViewStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Align content at the top
    paddingTop: 60, // Add padding top to push content down a bit
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 20,
  },
  loginbuttonstyle: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FC8019',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dontHaveAccStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  timer: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  infoText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    color: '#FC8019',
    fontSize: 18,
    marginLeft: 5,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
