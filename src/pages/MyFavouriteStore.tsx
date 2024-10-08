import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {metrices} from '../assets/metrices';
import {useNavigation} from '@react-navigation/native';
import TopBarComponent from '../components/TopBarComponent';
import Favourite from '../components/FavouriteComponent';
import {hotelListFavour} from '../assets/constantsDummy';
function MyFavouriteStoresPage(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{height: metrices(100), backgroundColor: 'white'}}>
      <TopBarComponent
        title={'My Favourite Stores'}
        homeIcon={true}
        backIcon={true}
      />
      <Favourite list={hotelListFavour} />
    </SafeAreaView>
  );
}

export default MyFavouriteStoresPage;
