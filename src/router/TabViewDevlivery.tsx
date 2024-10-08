import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { TabView, SceneMap, NavigationState, Route } from 'react-native-tab-view';
import DeliveryScreen from '../components/tabViewScreen/Delivery';
import SelfPickup from '../components/tabViewScreen/SelfPickupScreen';
import { paylod } from '../assets/constantsDummy';
import { useDispatch } from 'react-redux';
import { deliveryServiceHandler } from '../store/services/DeliveryServices';
const FirstRoute = () => (
  <ScrollView>
    <DeliveryScreen  />
  </ScrollView>
);

const SecondRoute = () => (
  // <ScrollView>
  <SelfPickup />
  // </ScrollView>
);

function TabViewForDeliverySelf(): React.JSX.Element {
  const dispatch = useDispatch()
  const [index, setIndex] = React.useState(0);
  const [hotelList, sethotelList] = useState({})
  const [routes] = React.useState([
    { key: 'first', title: 'Delivery' },
    { key: 'second', title: 'Self pickup' },
  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute/>,
    second: SecondRoute,
  });
  const renderTabBar = (props: {
    navigationState: NavigationState<Route>;
    position: Animated.Node<number>;
    jumpTo: (key: string) => void;
  }) => {
    const { navigationState, position, jumpTo } = props;
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch(deliveryServiceHandler())
            .then(async(originalPromiseResult) => {
              // sethotelList(originalPromiseResult?.data)
            })
          // const res = await DeliveryServices(paylod);
          // sethotelList(res?.data)
          // console.log("Response:=================---1111111111111-----", res);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle errors
        }
      };

      fetchData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <View style={styles.headingContainer}>
        <Text style={{ color: 'grey', fontSize: 13 }}>
          {hotelList?.length} RESTAURANTS NEAR YOU
        </Text>
        <View
          style={{
            width: '54%',
            borderRadius: 22,
            flexDirection: 'row',
            height: '60%',
            backgroundColor: 'white',
          }}>
          {navigationState.routes.map((route: any, index: number) => {
            const isRouteActive = index === navigationState.index;
            const borderRadiusStyle = {
              borderRadius: 22,
            };
            const backgroundColor = isRouteActive ? '#FC8019' : 'transparent';

            const onPress = () => {
              // console.log('Route..............', route);
              jumpTo(route.key);
            };

            return (
              <>
                <Pressable
                  disabled={false}
                  key={route.key}
                  style={[
                    {
                      width: '50%',
                      borderRadius: 22,
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor,
                    },
                    borderRadiusStyle,
                  ]}
                  onPress={onPress}>
                  <Text
                    style={{
                      color: isRouteActive ? 'white' : 'black',
                      fontSize: 16,
                    }}>
                    {route.title}
                  </Text>
                </Pressable>
              </>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </>
  );
}

export default TabViewForDeliverySelf;

const styles = StyleSheet.create({
  headingContainer: {
    width: '100%',
    height: 58,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F2F4F9',
    justifyContent: 'space-between',
    position: 'relative',
    top: 0,
    zIndex: 100,
  },
});
