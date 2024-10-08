import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../pages/HomePage';
import AccountPage from '../pages/Account';
import AlertsPage from '../pages/Alerts';
import ExplorePage from '../pages/ExplorePage';
import { metrices, width } from '../assets/metrices';
import { useSelector } from 'react-redux';
import Cart from '../pages/Cart';

const Tab = createBottomTabNavigator();
function TabBar(): React.JSX.Element {
  const products = useSelector(state => state.AddProductData.products);
  const productCount = Object.keys(products).length;
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,

        tabBarItemStyle: [
          {
            backgroundColor: 'white',
            height: '96%',
            alignSelf: 'center',
            borderRadius: 12,
            backfaceVisibility: 'visible',
          },
        ],
        tabBarStyle: [
          {
            display: route.name === 'CartPage' ? 'none' : 'flex',
            backfaceVisibility: 'visible',
            height: 76,
            marginBottom: 10,
            width: '94%',
            alignSelf: 'center',
            borderRadius: 10,
          },
          null,
        ],
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? '#FC8019' : 'grey';
          const iconColor = 'black';
          const iconSize = 26;
          switch (route.name) {
            case 'HomePage' || 'DetailsPage':
              return (
                <>
                  <SimpleLineIcons
                    name={'location-pin'}
                    size={iconSize}
                    color={focused ? '#FC8019' : 'grey'}
                  />
                  <View style={styles.emptyViewStyle} />
                  <Text style={{ color: tintColor }}>Near Me</Text>
                </>
              );
            case 'AlertsPage':
              return (
                <>
                  <SimpleLineIcons
                    name={'bell'}
                    size={iconSize}
                    color={focused ? '#FC8019' : 'grey'}
                  />
                  <View style={styles.circle}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{3}</Text>
                  </View>
                  <View style={styles.emptyViewStyle} />
                  <Text style={{ color: tintColor }}>Alerts</Text>
                </>
              );
            case 'ExplorePage':
              return (
                <>
                  <Ionicons
                    name={'search-outline'}
                    size={iconSize}
                    color={focused ? '#FC8019' : 'grey'}
                  />
                  <View style={styles.emptyViewStyle} />
                  <Text style={{ color: tintColor }}>Explore</Text>
                </>
              );
            case 'CartPage':
              return (
                <>
                  <SimpleLineIcons
                    name={'bag'}
                    size={iconSize}
                    color={focused ? '#FC8019' : 'grey'}
                  />
                  <View style={styles.circle}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{productCount}</Text>
                  </View>
                  <View style={styles.emptyViewStyle} />
                  <Text style={{ color: tintColor }}>Cart</Text>
                </>
              );
            case 'AccountPage':
              return (
                <>
                  <SimpleLineIcons
                    name={'user'}
                    size={iconSize}
                    color={focused ? '#FC8019' : 'grey'}
                  />
                  <View style={styles.emptyViewStyle} />
                  <Text style={{ color: tintColor }}>Account</Text>
                </>
              );
          }
        },
      })}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AlertsPage"
        component={AlertsPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ExplorePage"
        component={ExplorePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CartPage"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AccountPage"
        component={AccountPage}
        options={{ headerShown: false }}
      />
      

    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  emptyViewStyle: {
    padding: 3,
  },
  circle: {
    flexDirection: 'column',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').width * 0.05,
    backgroundColor: '#FC8019',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 2,
    right: metrices(2),
    borderWidth: 1,
    borderColor: '#FC8019',
  },
});
export default TabBar;
