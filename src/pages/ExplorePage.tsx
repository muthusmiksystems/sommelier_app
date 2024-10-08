import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { metrices } from '../assets/metrices';
import TextInputComponent from '../components/TextInput';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../assets/constantsDummy';

function ExplorePage(): React.JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hotel, setHotel] = useState([])
  const hotelList = useSelector((state) => state?.getRestaurentDetailsServiceData?.data) || [];

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    const filteredObj = Object.fromEntries(
      Object.entries(hotelList).filter(([key, value]) => {
        // Example condition: keep values greater than 2
        return key;
      })
    );
    setSearchResults(filteredObj);
  };


  const handleNavigationItem = () => {
    navigation.navigate('DetailsPage');
  };
  useEffect(() => {
    setSearchResults(hotelList);
    setHotel(hotelList)
  }, [hotelList]);

  const imageUrl = (imageName: string): string => {
    return url + imageName;
  };
  const hasConsecutiveLetters = (text: string, search: string): boolean => {
    for (let i = 0; i < text.length - 1; i++) {
      if (text[i] === search[0] && text[i + 1] === search[1]) {
        return true;
      }
    }
    return false;
  };
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topBarViewStyle}>
        <View style={styles.backButtonViewStyle}>
          <TouchableOpacity
            style={styles.touchContainerStyle}
            onPress={() => navigation.goBack()}>
            <Entypo name={'chevron-left'} size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <TextInputComponent
          placeholder="Search for restaurants"
          type="search"
          editable={true}
          style={styles.textViewInputStyle}
          value={searchText}
          onChangeText={handleSearchChange}
        />
      </View>
      {searchText ? ( hasConsecutiveLetters(hotelList?.name.toLowerCase(), searchText.toLowerCase()) &&
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
      ) : 
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
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: metrices(100),
  },
  textViewInputStyle: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    borderColor:'black',
    borderWidth:0.5,
    borderRadius: 10,
    alignItems: 'center',
  },
  topBarViewStyle: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  backButtonViewStyle: {
    width: '16%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  touchContainerStyle: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

export default ExplorePage;
