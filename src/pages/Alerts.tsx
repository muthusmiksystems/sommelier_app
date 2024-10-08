import React from 'react';
import {SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/compat';
import HeaderComponent from '../components/HeaderComponent';
import {hotelList} from '../assets/constantsDummy';
import AlertsList from '../components/AlertsList';
import {metrices} from '../assets/metrices';

function Alerts(): React.JSX.Element {
  const navigation = useNavigation();
  const handleDrawerNavigation = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <SafeAreaView>
      <HeaderComponent onPressHamburger={handleDrawerNavigation} />
      <View style={styles.listContainerStyle}>
        <Text style={{fontSize: 18, color: 'black', left: '5.6%'}}>
          Alerts ({hotelList.length})
        </Text>
        <AlertsList list={hotelList} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  topViewStyle: {
    width: '100%',
    height: 60,
    borderWidth: 2,
    padding: '4%',
  },
  listContainerStyle: {
    height: metrices(79.5),
    width: '100%',
    backgroundColor: 'white',
  },
});
export default Alerts;
