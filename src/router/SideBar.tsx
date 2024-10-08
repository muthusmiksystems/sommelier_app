import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/compat';
import { useNavigation } from '@react-navigation/native';
import hotelImage from '../assets/images/logobg.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logindetails } from '../store/services/loginService';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust import based on the icon set you want to use
import { url } from '../assets/constantsDummy';

const Sidebar = (props: any) => {
  const dispatch = useDispatch()
  const info = useSelector((state) => state?.logindetailsdata?.data)
  const info1 = useSelector((state) => state?.getRestaurentDetailsServiceData?.data);
  const navigation = useNavigation();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [first, setFirst] = useState('')
  useEffect(()=>{
    setFirst(info1)
      },[info1])
      const imageUrl =( imageName:any) => {
        return url + imageName;
      };
  const handlePage = (router, params = {}) => {

    if (router === 'Logout') {
      handleLogout()
    }
    else {
      navigation.dispatch(DrawerActions.closeDrawer());
      navigation.navigate(router);
    }
    // if (router == 'Course') {
    //   navigation.navigate('Home', {screen: 'MyCourse'});
    // } else if (router == 'Wishlist') {
    //   navigation.navigate('Home', {
    //     screen: 'MyCourse',
    //     params: {screen: 'Wish Lists'},
    //   });
    // } else if (router && router != 'Course' && 'Wishlist') {
    //   navigation.navigate(router);
    // }
  };
  useEffect(() => {
    retrieveUserToken();
  }, []);

  const retrieveUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      setUserToken(token);
    } catch (error) {
      console.error('Error retrieving user token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('UserToken');
      setUserToken(null);
      dispatch(logindetails(null))
      navigation.dispatch(DrawerActions.closeDrawer());
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing user token:', error);
    }
  };

  const handlnavigate = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(info?.email ? 'AccountPage' : 'Login')
  }

  const dataHelpInfo = [
    // { id: 0, name: 'Dashboard', icon: 'dashboard', router: 'Dashboard' },
    // { id: 1, name: 'Stores', icon: 'shopping-bag', router: 'MyFavouriteStores' },
    { id: 2, name: 'Booking', icon: 'calendar', router: 'Booking' },
    // { id: 3, name: 'Assign Table', icon: 'table', router: 'AssignTablePage' },
    { id: 4, name: 'Place Order', icon: 'shopping-cart', router: 'DetailsPage' },
    // { id: 5, name: 'Earnings', icon: 'money', router: 'MyWallet' },
    { id: 6, name: 'My Account', icon: 'user', router: info?.email ? 'AccountPage' : 'Login' },
    { id: 7, name: info?.email ? 'Logout' : 'Login', icon: 'sign-out', router: info?.email ? 'Logout' : 'Login' }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.imageViewContainer} onPress={handlnavigate}>
          <Image
            source={{ uri: imageUrl(first?.image) }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {dataHelpInfo.map((value, index) => (
          <TouchableOpacity
            key={value.id}
            onPress={() => handlePage(value.router)}
            style={styles.buttonContainer}
          >
            <Icon name={value.icon} size={22} color="#E5AA44" style={styles.icon} />
            <Text style={styles.buttonText}>{value.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {info && (
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>{info.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  imageViewContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgray',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#E5AA44'
  },
  icon: {
    marginRight: 10,
  },
  bottomTextContainer: {
    backgroundColor: '#F5F5F5', // Light gray background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC', // Light border color
    alignItems: 'center', // Center the text horizontally
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold', // Make the text bold
    color: '#FF6347', // Red color for text
    marginTop: 5, // Add some margin from the container
    textTransform: 'uppercase', // Convert text to uppercase
  },
});

export default Sidebar;
