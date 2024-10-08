// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Importing useDispatch hook
import 'react-native-gesture-handler';
import MyStack from './src/router/Router';
import { NotificationListener, requestUserPermission } from './src/components/PushNotificationhelper'
import DeviceInfo from 'react-native-device-info';
import { deviceInfoServiceHandler } from './src/store/services/DeviceInfoService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button } from 'react-native';
import TouchID from 'react-native-touch-id'
import { restaurentId as restaurentId, restaurentSlug as restaurentSlug } from './app.json'
import { loadInitialProducts } from './src/store/services/AddProductService';
import { StripeProvider } from '@stripe/stripe-react-native';
import { getRestaurentDetailsServiceHandler } from './src/store/services/GetRestaurentDetailsService';
function App(): React.JSX.Element {
  const dispatch = useDispatch(); // Get the dispatch function
  const [first, setFirst] = useState('');


  useEffect(() => {
    requestUserPermission();
    NotificationListener();

    const getDeviceId = async () => {
      const id = await DeviceInfo.getDeviceId();
      return id;
    };

    const updateDeviceId = async () => {
      const id = await getDeviceId();
      let fcmtoken = await AsyncStorage.getItem('fcmtoken');
      postDeviceInfo(fcmtoken); // Call the function to post device info
    };

    updateDeviceId();
    RestaurentInitial()
    dispatch(loadInitialProducts());
    getRestaurentDetailsHandler()

  }, []);
  useEffect(() => {

  }, []);
  function getRestaurentDetailsHandler() {
    dispatch(getRestaurentDetailsServiceHandler())
      .then((originalPromiseResult: any) => {
        setFirst(originalPromiseResult?.payload);
        console.log('first', originalPromiseResult?.payload)
      })
      .catch((err: any) => {
        console.log('erroriginalPromiseResult', err);
      });
  }
  const RestaurentInitial = async () => {
    await AsyncStorage.setItem('RestaurentId', restaurentId)
    await AsyncStorage.setItem('restaurentSlug', restaurentSlug)
  }
  const postDeviceInfo = (id: any) => {
    dispatch(deviceInfoServiceHandler(id)) // Dispatching the Redux action
      .then((originalPromiseResult: any) => {
      })
      .catch((err: any) => {
        console.log("erroriginalPromiseResult", err);
      })
  }
  return (

    <>
      <StripeProvider publishableKey={first?.stripe_public_key}>
        <MyStack />
      </StripeProvider>

      {/* <LoginScreen /> */}
      {/* <RegistrationScreen /> */}
      {/* <SplashScreen /> */}
    </>
  );
}

export default App;
