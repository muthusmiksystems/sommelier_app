import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Text,
} from 'react-native';
import Applogo from '../assets/images/logobg.png';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getRestaurentDetailsServiceHandler } from '../store/services/GetRestaurentDetailsService';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../assets/constantsDummy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logindetails } from '../store/services/loginService';
import { getuserServiceHandler } from '../store/services/GetUserServices';
function SplashScreen(): React.JSX.Element {
  const dispatch = useDispatch();
  const info1 = useSelector((state) => state?.getRestaurentDetailsServiceData?.data);
  const [data, setData] = useState(null);
  const [first, setFirst] = useState(info1);

  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve data from AsyncStorage
        const dataString = await AsyncStorage.getItem('UserToken');
        if (dataString !== null) {
          const data = JSON.parse(dataString);
          dispatch(getuserServiceHandler(data)).then((originalPromiseResult: any) => {
            if (originalPromiseResult.payload.data.success) {
              const originalData = originalPromiseResult?.payload?.data?.data?.is_fingerprint;
              setData(originalData);
              dispatch(logindetails(originalPromiseResult?.payload?.data?.data));
            }
          });
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data !== null) {
        navigation.navigate('HomeDrawerPage', { fingerprint: data });
      }
      else {
        navigation.navigate('Login');
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data, navigation]);


  const imageUrl = (imageName: string) => {
    return url + imageName;
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Image source={{ uri: imageUrl(first?.image) }} resizeMode="contain" style={styles.imageStyle} />
      <Text style={styles.poweredBy}>Powered by Sommelier®</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  poweredBy: {
    position: 'absolute',
    bottom: 20, // Adjust this value as needed
    fontSize: 14,
    color: 'gray',
  },
});

export default SplashScreen;
