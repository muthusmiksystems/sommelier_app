import React, { useEffect, useState } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TextInputComponent from '../components/TextInput';
import LoginWithGoogle from '../components/LoginWithGoogle';
import LoginWithFacebook from '../components/LoginWithFacebook';
import ButtonComponent from '../components/ButtonComponent';
import { LoginServices, loginOtpHandler, logindetails } from '../store/services/loginService';
import { emailPattern, passwordPattern } from '../assets/patterns/regrex';
import OverlayLoader from '../components/OverlayLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthTopStyleComponent from '../components/AuthTopStyleComponent';
import { metrices } from '../assets/metrices';
import DynamicPinCode from '../components/Pin';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import { getAddressServiceHandler } from '../store/services/getAddressService';
import FaceIDAuth from '../components/FaceIDAuth';
import { logindeviceInfoServiceHandler } from '../store/services/SaveLoginDeviceInfoService';
import Loader from '../components/Loader';

function LoginScreen(): React.JSX.Element {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: '', loginPage:true});
  const [error, setError] = useState({ email: '', password: '' });
  const isDarkMode = useColorScheme() === 'dark';
  const [showPinModal, setShowPinModal] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLoginDetails({ email: '', password: '' });
        setError({ email: '', password: '' });
      };
    }, []),
  );
  const handleGoogleLoginSuccess = (phoneNumber: string) => {
    return false;
  }
  const handleValidation = () => {
    const errors = {};
    if (!loginDetails.email) {
      errors.email = 'Email is required';
    } 
    // if (!loginDetails.password) {
    //   errors.password = 'Password is required';
    // } else if (!passwordPattern.test(loginDetails.password)) {
    //   errors.password =
    //     'Password should have minimum 8 characters with combination of alphabets, numbers and special characters.';
    // }
    setError(errors);
    return errors;
  };
  const postDeviceInfo = (id: any,originalData:any) => {
    const data={
      "push_token":id,
      "id":originalData?.id
    }
    dispatch(logindeviceInfoServiceHandler(data)) // Dispatching the Redux action
      .then((originalPromiseResult: any) => {
      })
      .catch((err: any) => {
        console.log("erroriginalPromiseResult", err);
      })
  }
  const handleLoginFunction = async () => {
    setLoader(true)
    const validation = handleValidation();
    if (Object.keys(validation).length === 0) {
      dispatch(loginOtpHandler(loginDetails)).then(async (originalPromiseResult: any) => {
        const originalData = originalPromiseResult;
        // Show a Toast message indicating successful login
        if (originalPromiseResult.payload.otp) {
          // console.log("USerToken..........response.data.data", response.data.data)
          setLoader(false)

          // dispatch(logindetails(originalPromiseResult?.payload?.data))
          // dispatch(getAddressServiceHandler(addressdetails)).then(async (addresspayload: any) => {
          //   console.log("adresssssss", addresspayload)
          //    let mergedData = { ...originalData, ...addresspayload.payload };
          //   setData(mergedData);
          // })
          await AsyncStorage.setItem(
            'UserOtp',
            JSON.stringify(originalPromiseResult.payload),
          );
          // navigation.navigate('BottomTabBar');
          ToastAndroid.showWithGravity(
            'Otp send succesfully',
            ToastAndroid.CENTER,
            ToastAndroid.LONG,
          );
          setLoader(false);
          navigation.navigate('Otpscreen', { loginDetails: loginDetails ,page:'login'});

        }
        else if (originalPromiseResult.payload.success === false) {
          ToastAndroid.showWithGravity(
            originalPromiseResult.payload.data,
            ToastAndroid.CENTER,
            ToastAndroid.LONG,
          );
          setLoader(false);
        }
        else {
          ToastAndroid.showWithGravity(
            'Something went wrong, Please try again later!',
            ToastAndroid.CENTER,
            ToastAndroid.LONG,
          );
          setLoader(false);
        }
      });
      // try {
      //   // setLoader(true);

      //   // navigation.navigate('BottomTabBar');
      //   // navigation.navigate('InnerDrawerPage');

      //   // return;
      //   const response = await LoginServices(loginDetails);
      //   console.log('response..............', response);
      //   if (response.status === 201 && response.data.success === true) {
      //     // console.log("USerToken..........response.data.data", response.data.data)
      //     await AsyncStorage.setItem(
      //       'UserToken',
      //       JSON.stringify(response.data.data),
      //     );
      //     // navigation.navigate('BottomTabBar');
      //     ToastAndroid.showWithGravity(
      //       'User logged in succesfully',
      //       ToastAndroid.CENTER,
      //       ToastAndroid.LONG,
      //     );
      //     setLoader(false);
      //     navigation.navigate('HomeDrawerPage');
      //   } else if (response.status === 201 && response.data.success === false) {
      //     ToastAndroid.showWithGravity(
      //       "Login details doesn't match",
      //       ToastAndroid.CENTER,
      //       ToastAndroid.LONG,
      //     );
      //     setLoader(false);
      //   } else {
      //     ToastAndroid.showWithGravity(
      //       'Something went wrong, Please try again later!',
      //       ToastAndroid.CENTER,
      //       ToastAndroid.LONG,
      //     );
      //     setLoader(false);
      //   }
      // } catch (error) {
      //   console.error('Error in login...........', error);
      // } finally {
      //   // ToastAndroid.showWithGravity("Something went wrong, Please try again later!", ToastAndroid.CENTER, ToastAndroid.LONG)
      //   setLoader(false);
      // }
    } else {
      setLoader(false)
      console.log('Validation errors in login..........', validation);
    }
  };

  const handleEmailChange = (text: any) => {
    setLoginDetails({ ...loginDetails, email: text });
    setError({ ...error, email: '' });
  };
  const handlePinModalOpen = () => {
    setShowPinModal(true);
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
  return (
    <KeyboardAvoidingView style={styles.mainStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {loader && <OverlayLoader />}
      <AuthTopStyleComponent
        title="LOGIN"
        subTitle="Enter your email"
      />
      {/* <TouchableOpacity
        onPress={handlePinModalOpen}>
        <Text style={{ color: '#FC8019' }}>Pin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleFaceModalOpen}>
        <Text style={{ color: '#FC8019' }}>Face Cam</Text>
      </TouchableOpacity> */}
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.subViewTwoStyle}>
          <View style={{ width: '100%' }}>
            <TextInputComponent
              placeholder={'Email'}
              style={styles.textInputStyle}
              value={loginDetails.email}
              onChangeText={handleEmailChange}
              hasError={error.email}
            />
          </View>
          {/* <View style={{ width: '100%' }}>
            <TextInputComponent
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.textInputStyle}
              value={loginDetails.password}
              onChangeText={(text: any) => {
                setLoginDetails({ ...loginDetails, password: text });
                setError({ ...error, password: '' });
              }}
              hasError={error.password}
            />
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{ width: '40%', alignSelf: 'flex-end' }}
                onPress={() => navigation.navigate('ForgetPassword')}>
                <Text
                  style={{ fontSize: 14, color: 'grey', alignSelf: 'flex-end' ,marginTop:'3%'}}>
                  Forget Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* <TouchableOpacity onPress={handleLoginFunction} style={styles.loginbuttonstyle}> */}
            <ButtonComponent
              style={styles.loginbuttonstyle}
              // onPress={() => { }}
              onPress={handleLoginFunction}
              placeHolder={'LOGIN'}
            />
          {/* </TouchableOpacity> */}
          <Text style={styles.orTextStyle}>-- OR --</Text>
          <LoginWithGoogle page={'login'} onGoogleLoginSuccess={handleGoogleLoginSuccess} mobile={0} />
          {/* <LoginWithFacebook page={'login'} onGoogleLoginSuccess={handleGoogleLoginSuccess} mobile={0} /> */}
          <View style={styles.dontHaveAccStyle}>
            <Text style={{ color: 'black' ,fontSize:18}}>Don't have an account yet? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}>
              <Text style={{ color: '#FC8019',fontSize:18 }}>Register</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}>
              <Text style={{ color: '#FC8019' }}>Pin</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
      
      <Modal
        visible={showPinModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handlePinModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <DynamicPinCode />
            <TouchableOpacity onPress={handlePinModalClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showFaceModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleFaceModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <FaceIDAuth />
            <TouchableOpacity onPress={handleFaceModalClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  scrollViewStyle: {
    width: '100%',
    height: metrices(68),
    backgroundColor: 'white',
  },
  subViewTwoStyle: {
    width: '100%',
    height: '100%',
    // paddingVertical: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
  orTextStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'black',
  },
  dontHaveAccStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  textInputStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 54,
    paddingHorizontal: 14,
    fontSize: 16,
    color: 'black',
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 0.6,
    backgroundColor: '#fff',
  },
  errorText: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 12,
    marginLeft: 10,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  loginbuttonstyle: {
    width: '100%',
    alignItems: 'center',
    opacity:100,
    marginTop: 20,
  },
});

export default LoginScreen;
