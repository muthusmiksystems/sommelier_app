import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import hotelImage from '../assets/images/logobg.png';
import {useNavigation} from '@react-navigation/native';
import {metrices} from '../assets/metrices';
function AlertsList({list}): React.JSX.Element {
  const navigation = useNavigation();

  const handleNavigationItem = (value: any) => {
    navigation.navigate('DetailsPage', {details: value});
  };

  return (
    <FlatList
      data={list}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => (
        <View
          style={{
            ...styles.itemContainer,
            borderWidth: 2,
            marginTop: index === 0 ? 14 : 0,
          }}>
          <TouchableOpacity
            disabled={true}
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
                  <Text style={{color: 'grey'}}>
                    Order Status:{' '}
                    <Text style={{color: 'black'}}>{item.status}</Text>
                  </Text>
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
    marginBottom: 18,
    paddingVertical: 8,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  touchStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  hotelNameViewStyle: {
    gap: 10,
    width: '100%',
    height: '58%',
  },
  imageContainer: {
    width: '34%',
    height: metrices(12),
    borderWidth: 2,
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
    height: metrices(12),
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default AlertsList;
