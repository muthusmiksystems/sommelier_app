import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Sidebar from './SideBar';
import TabBar from './BottomTabBar';

const InnerDrawerPage = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <Sidebar {...props} />}
      initialRouteName="MenuScreenTwo"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="MenuScreenTwo" component={TabBar} />
    </Drawer.Navigator>
  );
};

export default InnerDrawerPage;
