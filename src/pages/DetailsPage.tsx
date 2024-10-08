import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import TopBarComponent from '../components/TopBarComponent';
import { useNavigation } from '@react-navigation/native';
import { metrices } from '../assets/metrices';
import hotelImage from '../assets/images/logobg.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { url } from '../assets/constantsDummy';
import FoodList from './FoodList';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputComponent from '../components/TextInput';
// import { RestaurantFoodDetailsServices } from '../store/services/loginService';
import HorizontalCardSlider from '../components/HorizontalCardSlider';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { foodDetailsServiceHandler } from '../store/services/FoodDetailsServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../store/services/AddProductService';
import { getRestaurentDetailsServiceHandler } from '../store/services/GetRestaurentDetailsService';
import HeaderComponent from '../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/compat';
function DetailsPage(): React.JSX.Element {
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState([])
  const dispatch = useDispatch()
  const [recommend, setRecommend] = useState([])
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchTextError, setSearchTextError] = useState('');
  const [openMenu, setOpenMenu] = useState(false)
  const detailsValue = useSelector((state) => state?.getRestaurentDetailsServiceData?.data)
  const products = useSelector(state => state.AddProductData.products);

  const totalQuantity = Object.values(products).reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = Object.values(products).reduce((sum, product) => {
    return sum + (parseFloat(product.price) * product.quantity);
  }, 0);
  // const detailsValue = route?.params?.details;
  const handleCartItem = () => {

    navigation.navigate('BottomTabBar', { screen: 'CartPage', detailsValue: detailsValue });
  };
  function imageUrl(imageName: string): string {
    return url + imageName;
  }
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };
  const fetchDataItems = async () => {
    // try {
    // const data = detailsValue ? detailsValue.slug : 'social-street-s2-yobzfdd06ww2myv';

    // const res = await RestaurantFoodDetailsServices(detailsValue?.slug);
    dispatch((foodDetailsServiceHandler()))
      .then(async (originalPromiseResult: any) => {
        setItems(originalPromiseResult?.payload?.items)
        setRecommend(originalPromiseResult?.payload?.recommended)
      })
      .catch((err) => {
        console.log("erroriginalPromiseResult", err);
      })

    // const originalPromiseResult =  dispatch(foodDetailsServiceHandler(data));
    // setItems(originalPromiseResult?.data?.items);
    // setRecommend(originalPromiseResult?.data?.recommended);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   // Handle errors
    // }
  };

  useEffect(() => {
    fetchDataItems();
    // fetchDataInfo();
  }, [])
  useEffect(() => {
    setInfo(detailsValue)
  }, [detailsValue])
  const handleMenu = () => {
    setOpenMenu(!openMenu)
  }
  const handleDrawerNavigation = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const handleRouteNavigation = (routeName: string) => {
    if (routeName === 'goback') {
      navigation.goBack()
    } else {
      navigation.navigate(routeName);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView>
          <HeaderComponent
            onPressHamburger={handleDrawerNavigation}
            onPressRoute={() => handleRouteNavigation('goback')}
          />
          <View
            style={{
              ...styles.itemContainer,
              marginTop: 0,
            }}>
            <View style={styles.imageContainer}>
              {info && (
                <Image
                  source={{ uri: imageUrl(info?.image) }}
                  resizeMode="contain"
                  style={styles.image}
                />
              )}

            </View>
            <View style={styles.textContainer}>
              <View style={styles.textresContainer}>
                <View style={{
                  ...styles.hotelNameViewStyle,
                  height: 20
                }}>
                  <Text style={{ fontSize: 18, color: 'black' }}>
                    {info?.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: 'grey' }}>
                    {info?.description}
                  </Text>
                </View>
              </View>
              <View style={styles.bottomViewContainer}>
                <View style={styles.subBottomViewContainer}>
                  <FontAwesome name={'star'} size={16} color={'orange'} />
                  <Text style={styles.text}> {info?.rating}</Text>
                </View>
                <View style={styles.subBottomViewContainer}>
                  <SimpleLineIcons
                    name={'location-pin'}
                    size={16}
                    color={'grey'}
                  />
                  <Text style={styles.text}> {info?.delivery_time}</Text>
                </View>
                <View style={styles.subBottomViewContainer}>
                  <SimpleLineIcons name={'wallet'} size={16} color={'grey'} />
                  <Text style={styles.text}> ${info?.price_range} FOR TWO</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.searchTouchContainer}
          >
            <TextInputComponent
              placeholder="Search for stores or items..."
              type="search"
              editable={false}
              style={styles.textInputStyle}
              value={searchText}
              onChangeText={handleSearchChange}
              hasError={searchTextError}
            />
          </TouchableOpacity> */}
          <View>
            <FoodList items={items} recommend={recommend} products={products} />
          </View>
        </ScrollView>
      </View>
      <View style={{ ...styles.menubottom, bottom: totalQuantity > 0 ? 60 : 0 }}>
        <TouchableOpacity style={styles.menuButtonContainer} onPress={handleMenu}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>MENU</Text>
        </TouchableOpacity>
      </View>

      <Modal
        // animationType="slide"
        transparent={openMenu}
        visible={openMenu}
        onRequestClose={handleMenu}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={handleMenu}
        >
          <View style={styles.modalContent}>
            {Object.keys(items).map((categoryName) => (
              <View key={categoryName} style={styles.categoryRow}>
                <Text style={{ fontSize: 16, paddingEnd: 10 }}>{categoryName}</Text>
                <Text style={{ fontSize: 16 }}>{items[categoryName].length}</Text>
              </View>
            ))}
          </View>

        </TouchableOpacity>
      </Modal>
      {totalQuantity > 0 &&
        <View style={styles.bottomButtomViewStyle}>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleCartItem}>
              <View style={styles.addOrderViewContainerStyle}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>
                  {totalQuantity} items | ${totalPrice.toFixed(2)}
                </Text>

              </View>
              <View style={styles.addOrderViewContainerStyle}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>View Cart </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      }


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  common: {
    backgroundColor: 'white',
  },
  centerViewContainer: {
    width: '100%',
    height: metrices(82),
    backgroundColor: '#F2F4F9',
  },
  bottomButtomViewStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60, // Adjust the height according to your design
    backgroundColor: '#60B246',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomButtonTouchContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  imageViewContainer: {
    width: '94%',
    height: metrices(26),
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: '4%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  valueTextStyle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 12,
  },
  hotelNameContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    marginTop: 12,
    gap: 10,
  },
  addOrderViewContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // buttonStyle: {
  //   width: '100%',
  //   height: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  heartIconContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonContainer: {
    flex: 1, // Take up all available space in the row
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Distribute space between items
    alignItems: 'center', // Center items vertically
    paddingHorizontal: 20, // Adjust padding as needed
  },
  buttonStyle: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center',
    flex: 1, // Take up all available space in the row
    justifyContent: 'space-between', // Distribute space between items
    paddingHorizontal: 20, // Center items vertically
  },

  heartIconTouchableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '30%',
    height: 100,
    marginStart: '2%',
    marginEnd: '3%',

  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '60%',
    height: 56,
  },
  hotelNameViewStyle: {
    gap: 10,
    width: '100%',
    height: '50%',
  },
  bottomViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subBottomViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
  },
  itemContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 0,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  searchTouchContainer: {
    // borderColor:'red',
    margin: 0,
    height: 100,
    // borderWidth:1,
    justifyContent: 'center',
  },
  textInputStyle: {
    width: '95%',
    // height: '30%',
    flexDirection: 'row',
    // paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'black', // Set the border color
    borderWidth: 0.4,
    backgroundColor: 'white',
    // justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  textresContainer: {
    width: '100%',
    height: 70,
  },
  // Inside your styles constant

  menubottom: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20, // Adjust padding as needed
    marginBottom: 10,
    alignItems: 'center',
  },
  menuButtonContainer: {
    backgroundColor: 'orange',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8, // Adjust vertical padding as needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 8,
    // alignItems: 'center',
    justifyContent: 'space-between',

  },
  categoryRow: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
export default DetailsPage;
