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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Item {
  id: number;
  hotelName: string;
  cussine: string;
  wishlist: number;
  ratings: number;
  time: string;
  ruppees: number;
}

interface Props {
  list: Item[];
}

const TruncatedText: React.FC<{text: string; maxLength: number}> = ({
  text,
  maxLength,
}) => {
  if (text.length <= maxLength) {
    return <Text style={{color: 'grey'}}>{text}</Text>;
  }

  const truncatedText = `${text.substring(0, maxLength)}...`;
  return <Text style={{color: 'grey'}}>{truncatedText}</Text>;
};

const Favourite: React.FC<Props> = ({list}): React.ReactElement => {
  return (
    <>
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View
            style={{
              ...styles.itemContainer,
              marginBottom: index === list.length - 1 ? 10 : 0,
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={hotelImage}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textPartOneStyle}>
                <View style={styles.insideTextStyle}>
                  <Text style={{fontSize: 14, color: 'black'}}>
                    {item.hotelName}
                  </Text>
                  <TruncatedText text={item.cussine} maxLength={30} />
                </View>
                <TouchableOpacity style={styles.heartIconContainer}>
                  {item?.wishlist === 1 ? (
                    <Ionicons name={'heart'} size={26} color="red" />
                  ) : (
                    <Ionicons name={'heart-outline'} size={26} color="red" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{borderTopWidth: 1}} />
              <View style={styles.ratingViewContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <FontAwesome name={'star'} size={18} color={'orange'} />
                  <Text style={{color: 'grey'}}> {item.ratings}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <SimpleLineIcons
                    name={'location-pin'}
                    size={18}
                    color={'grey'}
                  />
                  <Text style={{color: 'grey'}}> {item.time}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <SimpleLineIcons name={'wallet'} size={18} color={'grey'} />
                  <Text style={{color: 'grey'}}> ${item.ruppees} FOR TWO</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '94%',
    marginTop: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '28%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '68%',
    height: 100,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  textPartOneStyle: {
    width: '100%',
    height: '58%',
    flexDirection: 'row',
  },
  insideTextStyle: {
    gap: 10,
    width: '86%',
    height: '100%',
  },
  heartIconContainer: {
    width: '14%',
    alignItems: 'center',
    height: '100%',
  },
  ratingViewContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
});
export default Favourite;
