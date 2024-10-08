import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {metrices} from '../assets/metrices';
import {useNavigation} from '@react-navigation/native';
import TopBarComponent from '../components/TopBarComponent';
import DeliveryScreen from '../components/tabViewScreen/Delivery';
import {hotelList} from '../assets/constantsDummy';
function MyOrdersPage(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{height: metrices(100), backgroundColor: 'white'}}>
      <TopBarComponent title={'My Orders'} homeIcon={true} backIcon={true} />
      <DeliveryScreen list={hotelList} />
    </SafeAreaView>
  );
}

export default MyOrdersPage;
