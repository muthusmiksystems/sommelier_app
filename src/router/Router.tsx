import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import RegistrationScreen from '../pages/RegistrationScreen';
import ForgetPassword from '../pages/ForgetPassword';
import TabBar from './BottomTabBar';
import ManageAddress from '../pages/ManageAddress';
import MyOrdersPage from '../pages/MyOrders';
import MyWalletPage from '../pages/MyWallet';
import MyFavouriteStoresPage from '../pages/MyFavouriteStore';
import DetailsPage from '../pages/DetailsPage';
import MenuScreen from '../pages/MenuScreen';
import QrCodeScreen from '../pages/QrCode';
import MemberInfoPage from '../pages/MemberInfo';
import HomeDrawerPage from './HomeDrawer';
import InnerDrawerPage from './InnerDrawer';
import CheckOutPage from '../pages/CheckOutPage';
import StoresPage from '../pages/StoresPage';
import Itemmenupage from '../pages/ItemsPage';
import AssignTablePage from '../pages/AssignTablepage';
import EarningsPage from '../pages/EarningsPage';
import SettingsPage from '../pages/SettingsPage';
import AccountPage from '../pages/Account'
import Dashboardpage from '../pages/Dashboardpage';
import Otpscreen from '../pages/Otpscreen';
import Loader from '../components/Loader';
import RunningOrders from '../pages/CartComponent/RunningOrders';
import Booking from '../pages/Booking';
import Cart from '../pages/Cart';
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

function MyStack(): React.JSX.Element {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // component={Otpscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otpscreen"
          component={Otpscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabBar"
          component={TabBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageAddress"
          component={ManageAddress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrdersPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyWallet"
          component={MyWalletPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyFavouriteStores"
          component={MyFavouriteStoresPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailsPage"
          component={DetailsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QrCodeScreen"
          component={QrCodeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemberInfoPage"
          component={MemberInfoPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeDrawerPage"
          component={HomeDrawerPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CartPage"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InnerDrawerPage"
          component={InnerDrawerPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckOutPage"
          component={CheckOutPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoresPage"
          component={StoresPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Itemmenupage"
          component={Itemmenupage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AssignTablePage"
          component={AssignTablePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EarningsPage"
          component={EarningsPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsPage"
          component={SettingsPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountPage"
          component={AccountPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboardpage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RunningOrder"
          component={RunningOrders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
