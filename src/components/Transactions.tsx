import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Google from '../assets/images/google.png';
import {metrices} from '../assets/metrices';

function TransactionsListingPage({list}): React.JSX.Element {
  return (
    <>
      {list.length !== 0 ? (
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
                  source={Google}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
              <View style={styles.textContainer}>
                <View style={styles.nameViewContainer}>
                  <Text style={{fontSize: 14, color: 'black'}}>
                    {item.hotelName}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.status === 'Success' ? (
                      <AntDesign
                        name={'checkcircleo'}
                        size={16}
                        color={'green'}
                      />
                    ) : item.status === 'Cancelled' ? (
                      <MaterialCommunityIcons
                        name={'cancel'}
                        size={16}
                        color={'red'}
                      />
                    ) : item.status === 'Refunded' ? (
                      <AntDesign
                        name={'checkcircleo'}
                        size={16}
                        color={'orange'}
                      />
                    ) : (
                      <SimpleLineIcons
                        name={'exclamation'}
                        size={16}
                        color={'yellow'}
                      />
                    )}
                    <Text style={{color: 'grey'}}> {item.status}</Text>
                  </View>
                </View>
                <View style={styles.amountViewContainer}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: 'grey', fontSize: 20}}>
                      ${item.ruppees}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.emptyTextStyle}>
            No Wallet Transactions Yet!!!
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '94%',
    height: metrices(8),
    paddingHorizontal: '2%',
    marginTop: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F2F4F9',
  },
  imageContainer: {
    width: '16%',
    height: '100%',
    justifyContent: 'center',
    // borderWidth: 2,
  },
  textContainer: {
    width: '82%',
    height: '100%',
    paddingVertical: '2%',
    flexDirection: 'row',
    // borderWidth: 2,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  emptyViewStyle: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
  },
  nameViewContainer: {
    width: '74%',
    height: '100%',
    gap: 4,
  },
  amountViewContainer: {
    width: '26%',
    height: '100%',
    justifyContent: 'center',
  },
  emptyTextStyle: {
    fontSize: 18,
    color: 'grey',
  },
});
export default TransactionsListingPage;
