import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TextInputComponent from '../components/TextInput';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/compat';
import HeaderComponent from '../components/HeaderComponent';
import TabViewForDeliverySelf from '../router/TabViewDevlivery';
import { metrices } from '../assets/metrices';
import OverlayLoader from '../components/OverlayLoader';

function HomePage(): React.JSX.Element {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchTextError, setSearchTextError] = useState('');
  const [loader, setLoader] = useState(false);
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };
  const handleDrawerNavigation = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  useEffect(() => {
    setLoader(true)
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2500); // 3 seconds delay

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {loader && <OverlayLoader />}
      <HeaderComponent onPressHamburger={handleDrawerNavigation} onPressRoute={() => navigation.goBack()} />
      <View style={{ height: metrices(79.5) }}>
        <View style={styles.searchContainer}>
          <View style={styles.textViewInputStyle}>
            <TouchableOpacity
              style={styles.searchTouchContainer}
              onPress={() =>
                navigation.navigate('BottomTabBar', { screen: 'ExplorePage' })
              }>
              <TextInputComponent
                placeholder="Search for stores or items..."
                type="search"
                editable={false}
                style={styles.textInputStyle}
                value={searchText}
                onChangeText={handleSearchChange}
                hasError={searchTextError}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TabViewForDeliverySelf />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 84,
    backgroundColor: '#F2F4F9',
    justifyContent: 'center',
  },
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
  itemContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '94%',
    marginTop: 30,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '34%',
    height: 100,
  },
  textContainer: {
    width: '60%',
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  searchTouchContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  textInputStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textViewInputStyle: {
    width: '90%',
    height: '70%',
    flexDirection: 'row',
    // paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
  },
  topViewStyle: {
    width: '100%',
    height: metrices(10),
    paddingVertical: 6,
    paddingLeft: 20,
    // borderColor: "red",
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: 2,
  },
  imageViewStyle: {
    width: '82%',
    height: '92%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: "center"
  },
});

export default HomePage;
