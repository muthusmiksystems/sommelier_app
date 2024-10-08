import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import hotelImage from '../../assets/images/logobg.png';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { paylod, url } from '../../assets/constantsDummy';
import { restaurantUrl } from '../../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurentDetailsServiceHandler } from '../../store/services/GetRestaurentDetailsService';

function DeliveryScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [hotelList, sethotelList] = useState([])
  const [first, setFirst] = useState([])
  // const hoeldata = useSelector((state) => state?.deliveryServiceData?.data?.data)
  const fetchDataInfo = async () => {
    // try {
    // const res = await RestaurantFoodDetailsServices(detailsValue?.slug);
    dispatch((getRestaurentDetailsServiceHandler()))
      .then( (originalPromiseResult: any) => {
        setFirst(originalPromiseResult?.payload)
      })
      .catch((err:any) => {
        console.log("erroriginalPromiseResult", err);
      })
  };
  const handleNavigationItem = () => {
    navigation.navigate('DetailsPage');
  };

  function imageUrl(imageName: string): string {
    return url + imageName;
  }

  useEffect(() => {
    fetchDataInfo()
  }, [])
  useEffect(() => {
    sethotelList(first)
  }, [first])
  return (
    // <FlatList
    //   data={hotelList}
    //   showsVerticalScrollIndicator={false}
    //   showsHorizontalScrollIndicator={false}
    //   // keyExtractor={item => item?.id.toString()}
    // renderItem={({ item, index }) => (

    <View
      style={{
        ...styles.itemContainer,
        marginTop: 14,
      }}>
      <TouchableOpacity
        onPress={() => handleNavigationItem()}
        style={styles.touchStyle}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl(hotelList?.image) }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textresContainer}>
            <View style={
              styles.hotelNameViewStyle
            }>
              <Text style={{ fontSize: 14, color: 'black' }}>
                {hotelList?.name}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 14, color: 'grey' }}>
                {hotelList?.description}
              </Text>
              {hotelList?.is_active === 0 ? (
                <Text style={{ fontSize: 13.5, color: 'orange' }}>
                  Not Accepting Orders
                </Text>
              ) : null}
            </View>
          </View>

          <View style={{ borderTopWidth: 0.5 }} />
          <View style={styles.bottomViewContainer}>
            <View style={styles.subBottomViewContainer}>
              <FontAwesome name={'star'} size={16} color={'orange'} />
              <Text style={styles.text}> {hotelList?.rating}</Text>
            </View>
            <View style={styles.subBottomViewContainer}>
              <SimpleLineIcons
                name={'location-pin'}
                size={16}
                color={'grey'}
              />
              <Text style={styles.text}> {hotelList?.delivery_time}</Text>
            </View>
            <View style={styles.subBottomViewContainer}>
              <SimpleLineIcons name={'wallet'} size={16} color={'grey'} />
              <Text style={styles.text}> ${hotelList?.price_range} FOR TWO</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    // )}
    // />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '94%',
    marginBottom: 30,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.5, // Border width
    borderColor: 'black', // Border color
  },

  touchStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  hotelNameViewStyle: {
    gap: 10,
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '30%',
    height: 100,
    marginStart: '2%',
    marginEnd: '3%',

  },
  bottomViewContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  subBottomViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    width: '60%',
    height: 70,
  },
  textresContainer: {
    width: '100%',
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
  },
});
export default DeliveryScreen;
