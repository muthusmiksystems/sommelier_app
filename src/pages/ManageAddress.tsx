import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {metrices} from '../assets/metrices';
import {useNavigation} from '@react-navigation/native';
import TopBarComponent from '../components/TopBarComponent';
import {addressList} from '../assets/constantsDummy';
import AddressList from '../components/AddresList';

function ManageAddress(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TopBarComponent
        title={'Manage Address'}
        homeIcon={true}
        backIcon={true}
      />
      <View style={styles.centerViewContainer}>
        <AddressList list={addressList} />
      </View>
      <View style={styles.bottomButtomViewStyle}>
        <TouchableOpacity
          style={styles.bottomButtonTouchContainer}
          onPress={() => navigation.goBack()}>
          <Text style={{color: 'white', fontSize: 20}}>New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centerViewContainer: {
    width: '100%',
    height: metrices(82),
    backgroundColor: '#F2F4F9',
  },
  bottomButtomViewStyle: {
    width: '100%',
    height: metrices(8),
    backgroundColor: '#FC8019',
  },
  bottomButtonTouchContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ManageAddress;
