import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Switch,
  ToastAndroid,
} from 'react-native';
import userGif from '../assets/images/userGif.gif';
import { metrices } from '../assets/metrices';
import { dataAcc } from '../assets/constantsDummy';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import power from '../assets/images/power.png';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch, useSelector } from 'react-redux';
import { logindetails } from '../store/services/loginService';
import { fingerprintServiceHandler } from '../store/services/FingerprintService';
import TopBarComponent from '../components/TopBarComponent';

interface AccountItem {
  title: string;
  icon: string;
  navigation: string;
  color: string;
}

function Account(): React.JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const info = useSelector((state) => state?.logindetailsdata?.data);
  const [userDetails, setUserDetails] = useState(info);
  const [enableFingerprint, setEnableFingerprint] = useState(userDetails.is_fingerprint === 0 ? false :true); // State for the switch
  const [userToken, setUserToken] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [loader, setLoader] = useState(false);
  const handleNavigation = (value: string) => {
    navigation.navigate(value, userDetails);
  };
  const toggleAlert = () => {
    userDetails ? setShowAlert(!showAlert) : navigation.navigate('Login');
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('UserToken');
      userDetails
        ? (setShowAlert(!showAlert), dispatch(logindetails(null)), navigation.navigate('Login'))
        : navigation.navigate('Login');

      setUserToken(null);
    } catch (error) {
      console.error('Error removing user token:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getToken();
      return () => {};
    }, [])
  );

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      if (token) {
        const parsedToken = JSON.parse(token);
        setUserDetails(info);
      } else {
        // Handle the case where token is not available
      }
    } catch (error) {
      // Handle error (e.g., AsyncStorage error or invalid JSON format)
      console.error('Error retrieving and parsing token:', error);
    }
  };

  const renderItem = ({ item }: { item: AccountItem }) => (
    <TouchableOpacity
      style={styles.renderItemContainer}
      onPress={() => handleNavigation(item.navigation)}>
      <SimpleLineIcons name={item.icon} size={30} color={item.color} />
      <Text style={styles.renderItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFingerprint=(newValue:any)=>{
    setEnableFingerprint(newValue)
    const data={
      "email":userDetails.email,
      "fingerprint":newValue ? 1 : 0
    }
    dispatch(fingerprintServiceHandler(data)).then(async (originalPromiseResult: any) => {
      try {
        const originalData = originalPromiseResult;
        if (originalPromiseResult.payload.data.success && originalPromiseResult.payload.data.message === 'Fingerprint added successfully') {
          setLoader(false);
          ToastAndroid.showWithGravity(
            originalPromiseResult.payload.data.message,
            ToastAndroid.CENTER,
            ToastAndroid.LONG,
          );
          dispatch(logindetails(originalPromiseResult?.payload?.data?.data))
        } else if (originalPromiseResult.payload.data.success === false) {
          ToastAndroid.showWithGravity(
            originalPromiseResult.payload.data,
            ToastAndroid.CENTER,
            ToastAndroid.LONG,
          );
          setLoader(false);
        } else {
          ToastAndroid.showWithGravity(
            'Something went wrong, Please try again later!',
            ToastAndroid.CENTER,
            ToastAndroid.LONG,
          );
          setLoader(false);
        }
      } catch (error) {
        console.error('Error handling dispatch result:', error);
        // Handle error
      }
    }).catch((error) => {
      console.error('Error dispatching fingerprintServiceHandler:', error);
      // Handle error
      setLoader(false);
    });
    

  }
  return (
    <SafeAreaView style={styles.container}>
      <TopBarComponent title="My Account" backIcon={true} homeIcon={false} />
      <View style={styles.topView}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userDetails?.name}</Text>
          <Text style={styles.userContact}>{userDetails?.phone}</Text>
          <Text style={styles.userContact}>{userDetails?.email}</Text>
        </View>
        <Animated.View style={[styles.userImage, { opacity: fadeAnim }]}>
          <Image source={userGif} resizeMode="contain" style={styles.image} />
        </Animated.View>
      </View>

      <View style={styles.bottomView}>
        <Text style={styles.sectionTitle}>My Account</Text>
        <FlatList
          data={dataAcc}
          renderItem={renderItem}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Enable Fingerprint</Text>
          <Switch
            value={enableFingerprint}
            onValueChange={(newValue) => handleFingerprint(newValue)}
          />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={toggleAlert}>
          <SimpleLineIcons name={'power'} size={24} color="red" />
          <Text style={styles.logoutText}>{userDetails?.email ? 'Logout' : 'Login'}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showAlert} transparent={true} animationType="fade" onRequestClose={closeModal}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={logout}>
              <SimpleLineIcons name={'power'} style={styles.alertIcon} color="red" />
              <Text style={styles.alertTitle}>{userDetails?.email ? 'LOGOUT' : 'LOGIN'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#F2F4F9',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 26,
    color: 'black',
  },
  userContact: {
    fontSize: 15,
    color: 'grey',
  },
  userImage: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    marginVertical: 10,
  },
  renderItemContainer: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.6,
    borderColor: 'lightgrey',
    backgroundColor: '#F2F4F9',
  },
  renderItemText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
    marginTop: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#F2F4F9',
    borderWidth: 0.6,
    borderColor: 'lightgrey',
  },
  logoutText: {
    fontSize: 20,
    color: 'red',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  alertIcon: {
    fontSize: 55,
    marginBottom: 20,
    fontWeight: '500',
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center'
  },
  alertTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '500',
    color: 'black',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default Account;
