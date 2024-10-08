import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import { metrices, width } from '../assets/metrices';
import { Menu, url } from '../assets/constantsDummy';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Banner from '../components/Banner';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/compat';
import HeaderComponent from '../components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurentDetailsServiceHandler } from '../store/services/GetRestaurentDetailsService';
import { getSlideServiceHandler } from '../store/services/GetSlideService';
const DEVICE_WIDTH = Dimensions.get('window').width;
function MenuScreen(): React.JSX.Element {
  const dispatch = useDispatch();
  const [first, setFirst] = useState('');
  const info1 = useSelector((state) => state?.getRestaurentDetailsServiceData?.data);

  useEffect(() => {
    setFirst(info1);
    checkApplicationPermission()
  }, [info1]);
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
      }
    }
  }
  const [slide, setSlide] = useState('');
  const navigation = useNavigation();
  const info = useSelector((state) => state?.logindetailsdata?.data);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    storeData(info?.phone);
  }, [info]);

  const storeData = async (dataToStore: any) => {
    try {
      await AsyncStorage.setItem('QRCodeData', (dataToStore ? dataToStore : ' '));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const handleNavigation = (value: string) => {
    navigation.navigate(info?.email == null ? 'Login' : value);
  };

  const renderItem = ({ item }: { item: AccountItem }) => {
    const isActive = first.is_active === 1;
    const hasReservations = first.sommelier_reservations === 1;

    if (item.title !== 'Make Booking' && item.title !== 'Place Order') {
      return renderMenuItem(item);
    } else if (item.title === 'Place Order' && isActive && !hasReservations) {
      return renderMenuItem(item);
    } else if (item.title === 'Make Booking' && !isActive && hasReservations) {
      return renderMenuItem(item);
    } else if (isActive && hasReservations) {
      return renderMenuItem(item);
    }
    return null;
  };

  const renderMenuItem = (item: AccountItem) => (
    <View style={styles.renderViewStyle}>
      <TouchableOpacity
        style={styles.renderViewTouchable}
        onPress={() => handleNavigation(item.navigation)}>
        <View style={styles.renderInnerViewStyle}>
          <SimpleLineIcons name={item.icon} size={30} color={item.color} />
        </View>
        <Text style={{ fontSize: 14, color: 'black' }}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleDrawerNavigation = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('UserToken');
      setUserToken(null);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing user token:', error);
    }
  };

  const handleRouteNavigation = (routeName: string) => {
    if (routeName === 'logout') {
      handleLogout();
    } else {
      navigation.navigate(routeName);
    }
  };

  const imageUrl = (imageName: string) => {
    return url + imageName;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderComponent
        onPressHamburger={handleDrawerNavigation}
        onPressRoute={() => handleRouteNavigation('logout')}
      />
      <View style={styles.bannerContainer}>
        <Banner />
      </View>
      <ImageBackground
        source={first?.background_image ? { uri: imageUrl(first?.background_image) } : null}
        style={styles.flatlistContainer}
      >
        <FlatList
          data={Menu}
          renderItem={renderItem}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  bannerContainer: {
    height: metrices(30),
    width: '100%',
    borderWidth: 0.5
  },
  flatlistContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 1,
    width: DEVICE_WIDTH
  },
  renderViewStyle: {
    width: '40%',
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginLeft: width(6.4),
    marginTop: '6%',
    height: metrices(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderBottomWidth: 10,
    borderColor: '#dba14b',
    backgroundColor: '#F2F4F9',
  },
  renderViewTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  renderInnerViewStyle: {
    width: '100%',
    height: '66%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topViewStyle: {
    width: '100%',
    height: metrices(10),
    paddingVertical: 6,
    paddingLeft: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: 2,
  },

  imageViewStyle: {
    width: '82%',
    height: '92%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default MenuScreen;
