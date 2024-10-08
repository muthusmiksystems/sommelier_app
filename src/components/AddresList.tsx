import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {metrices} from '../assets/metrices';
interface Address {
  id: number;
  addressType: string;
  addressDetail: string;
}
interface AddressListProps {
  list: Address[];
}
const AddressList: React.FC<AddressListProps> = ({list}): React.JSX.Element => {
  return (
    <>
      <FlatList
        data={list}
        // contentContainerStyle={{borderWidth: 2}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View
            style={{
              ...styles.itemContainer,
              marginTop: index === 0 ? 20 : 0,
              marginBottom: 20,
            }}>
            <View style={styles.textContainer}>
              <Text style={{fontSize: 14, color: 'black'}}>
                {item.addressType}
              </Text>
              <Text style={{fontSize: 14, color: 'black'}}>
                {item.addressDetail}
              </Text>
            </View>
            <View style={styles.sideContainer}>
              <AntDesign name={'checkcircleo'} size={16} color={'green'} />
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
    borderRadius: 8,
    width: '90%',
    height: metrices(12),
    paddingVertical: 8,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  textContainer: {
    gap: 10,
    width: '80%',
    height: '100%',
  },
  sideContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});
export default AddressList;
