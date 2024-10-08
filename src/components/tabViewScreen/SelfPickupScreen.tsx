import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {hotelList} from '../../assets/constantsDummy';
import hotelImage from '../../assets/images/logobg.png';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

function SelfPickup(): React.JSX.Element {
  const navigation = useNavigation();
  const handleNavigationItem = (value: any) => {
    navigation.navigate('DetailsPage', {details: value});
  };
  return (
    <FlatList
      data={hotelList}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <View
          style={{
            ...styles.itemContainer,
            marginTop: index === 0 ? 14 : 0,
          }}>
          <TouchableOpacity
            onPress={() => handleNavigationItem(item)}
            style={styles.touchStyle}>
            <View style={styles.imageContainer}>
              <Image
                source={hotelImage}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.hotelNameViewStyle}>
                <Text style={{fontSize: 14, color: 'black'}}>
                  {item.hotelName}
                </Text>
                <Text numberOfLines={1} style={{fontSize: 14, color: 'grey'}}>
                  {item.cussine}
                </Text>
              </View>
              <View style={{borderTopWidth: 1}} />
              <View style={styles.bottomViewContainer}>
                <View style={styles.subBottomViewContainer}>
                  <FontAwesome name={'star'} size={18} color={'orange'} />
                  <Text style={{color: 'grey'}}> {item.ratings}</Text>
                </View>
                <View style={styles.subBottomViewContainer}>
                  <SimpleLineIcons
                    name={'location-pin'}
                    size={18}
                    color={'grey'}
                  />
                  <Text style={{color: 'grey'}}> {item.time}</Text>
                </View>
                <View style={styles.subBottomViewContainer}>
                  <SimpleLineIcons name={'wallet'} size={18} color={'grey'} />
                  <Text style={{color: 'grey'}}> ${item.ruppees} FOR TWO</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '94%',
    marginBottom: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  touchStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  hotelNameViewStyle: {
    gap: 10,
    width: '100%',
    height: '58%',
  },
  imageContainer: {
    width: '34%',
    height: 100,
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
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default SelfPickup;
