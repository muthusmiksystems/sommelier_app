import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Dimensions } from 'react-native';
import TopBarComponent from '../components/TopBarComponent';
import DeliveryScreen from '../components/tabViewScreen/Delivery';
import OverlayLoader from '../components/OverlayLoader';
import { useDispatch, useSelector } from 'react-redux';
import ZigzagLines from 'react-native-zigzag-lines';
import CartItem from './CartComponent/CartItem';
import CouponSection from './CartComponent/CouponSection';
import DeliveryOptionsModal from './CartComponent/DeliveryOptionsModal';
import BillDetails from './CartComponent/BillDetails';
import empty from '../assets/images/cart-empty.png';
import { metrices } from '../assets/metrices';
import { CheckAvailabilityServiceHandler } from '../store/services/CheckAvailabilityItemService';
import { removeProduct } from '../store/services/AddProductService';
import { operationStatusServiceHandler } from '../store/services/gwtOperationStatusService';
import { couponServiceHandler } from '../store/services/CouponService';
import { useNavigation } from '@react-navigation/native';
import { CheckRunningOrderServiceHandler } from '../store/services/CheckRunningOderService';
// import TopBarComponent from '../components/TopBarComponent';
function Cart() {
  const [openModal, setModal] = useState(false);
  const [type, setType] = useState("DELIVERY");
  const [loader, setLoader] = useState(true);
  const [dotLoader, setDotLoader] = useState(false);
  const [couponText, setCouponText] = useState();
  const dispatch = useDispatch();
  const [distance, setDistance] = useState()
  const [operationData, setOperationData] = useState();
  const products = useSelector(state => state.AddProductData.products);
  const res = useSelector(state => state.logindetailsdata.data);
  const restaurant = useSelector(state => state?.getRestaurentDetailsServiceData.data)
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCoupon, setShowCoupon] = useState(null);
  const [couponData, SetCouponData] = useState();
  const [totalPay, setTotalPay] = useState();
  const navigation = useNavigation();
  const [comment, setComment] = useState('')
  const [delivery, setDelivery] = useState(0)
  const [runningOrder, setRunningOrder] = useState(false)
  let deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    const formattedData = { items: Object.values(products) };
    setItems(formattedData.items);
    calculateTotalPrice(formattedData.items);
  }, [products]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    setTotalPrice(total);
  };

  const formattedData = { items: Object.values(products) };
  const [items, setItems] = useState(formattedData.items);
  const productCount = Object.keys(products).length;

  const handleDeliveryPress = (text) => {
    setType(text);
    // alert(type)
    setModal(false);
    getTotal()
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    itemcheck();
    restaurantDetails();
    getTotal();

  }, []);
  useEffect(() => {
    CheckRunningOrder()
  }, [runningOrder])
  const itemcheck = async () => {
    if (productCount > 0) {
      const result = await dispatch(CheckAvailabilityServiceHandler(formattedData));
      const inactiveProducts = result.payload.data.filter(item => item.is_active === 0);
      inactiveProducts.forEach(item => {
        if (item.is_active !== 1) {
          dispatch(removeProduct({ id: item.id }));
        }
      });
    }
  };
  function CheckRunningOrder() {
    dispatch(CheckRunningOrderServiceHandler(res)).then(async (originalPromiseResult) => {
      console.log('eee', originalPromiseResult.payload.data)
      setRunningOrder(originalPromiseResult.payload.data);
    });
  }
  function restaurantDetails() {
    if (res?.default_address !== null) {
      dispatch(operationStatusServiceHandler(res)).then(async (originalPromiseResult) => {
        setOperationData(originalPromiseResult.payload.data);
      });
    }
  }

  function getGst(totalPrice) {
    var total = totalPrice;
    // if (couponData && couponData?.discount_type === 'AMOUNT') {
    //   total = totalPrice - couponData?.discount;
    // }
    if (res?.default_address !== null && type === "DELIVERY") {
      total = total + 5
    }
    const gst = total / 11;
    return gst;
  }

  function getTotal() {
    const gst = getGst(totalPrice);
    let coupon = 0;
    let total = 0
    console.log(type)
    if (res?.default_address !== null && type === "DELIVERY") {

      total = totalPrice + 5;
      // alert('1-',total);
    }
    else {
      // alert('2-',total)
      total = totalPrice;
    }
    if (couponData && couponData?.discount_type === 'AMOUNT') {
      coupon = couponData?.discount;
      total = totalPrice - couponData?.discount;

    } else if (couponData && couponData?.discount_type === 'PERCENTAGE') {
      // let percentage_discount = (couponData?.discount / 100) * (total);

      // if (couponData?.max_discount) {
      //   if (percentage_discount >= couponData?.max_discount) {
      //     percentage_discount = couponData?.max_discount;
      //   }
      // }
      total = totalPrice - getpercentageamount();
    }
    setTotalPay((total).toFixed(2));
  }

  function getpercentageamount() {
    let total = totalPrice;
    if (couponData && couponData?.discount_type === 'PERCENTAGE') {
      let percentage_discount = (couponData?.discount / 100) * (total);
      if (couponData?.max_discount) {
        if (percentage_discount >= couponData?.max_discount) {
          percentage_discount = couponData?.max_discount;
        }
      }
      return percentage_discount.toFixed(2);
    }
  }

  function getDeliveryamount() {
    const distancess = calculateDistance(
      restaurant.longitude,
      restaurant.latitude,
      res?.default_address?.longitude,
      res?.default_address?.latitude
    );
    setDistance(distancess)
    if (type === "DELIVERY") {

      if (restaurant.delivery_charge_type !== "DYNAMIC") {
        if (operationData?.free_delivery_subtotal > 0) {

          if (
            totalPrice >= operationData?.free_delivery_subtotal
          ) {

            setDelivery(0)
          } else {
            setDelivery(operationData?.delivery_charges)
          }
        } else {

          setDelivery(operationData?.delivery_charges)
        }
        return;
      }
      // }
    }
    if (type === "DELIVERY") {
      if (restaurant.delivery_charge_type === "DYNAMIC") {
        if (parseFloat(operationData?.free_delivery_subtotal) > 0) {
          if (
            parseFloat(totalPrice) >= parseFloat(operationData?.free_delivery_subtotal)
          ) {
            setDelivery(0)
          } else {
            //check if restaurant has dynamic delivery charge..
            calculateDynamicDeliveryCharge();
          }
        } else {
          //check if restaurant has dynamic delivery charge..
          calculateDynamicDeliveryCharge();
        }

      } else {
        // this.setState({ distance: nextProps.distance });
      }
    }

    function calculateDynamicDeliveryCharge() {

      const distanceFromUserToRestaurant = distance

      if (distanceFromUserToRestaurant > operationData?.base_delivery_distance) {
        const extraDistance = distanceFromUserToRestaurant - operationData?.base_delivery_distance;

        const extraCharge =
          (extraDistance / operationData?.extra_delivery_distance) * operationData?.extra_delivery_charge;

        let dynamicDeliveryCharge = parseFloat(operationData?.base_delivery_charge) + parseFloat(extraCharge);
        // if (localStorage.getItem("enDelChrRnd") === "true") {
        dynamicDeliveryCharge = Math.ceil(dynamicDeliveryCharge);
        // }
        setDelivery(dynamicDeliveryCharge)
      } else {
        setDelivery(operationData?.base_delivery_charge)
      }
    };
    getTotal()
    return type === 'DELIVERY' ? delivery : 0;
  }
  const calculateDistance = (lon1: any, lat1: any, lon2: any, lat2: any) => {
    function toRad(x: any) {
      return ((x * Math.PI) / 180).toFixed(2);
    }

    let R = 10; // km

    let x1 = lat2 - lat1;
    let dLat = toRad(x1);
    let x2 = lon2 - lon1;
    let dLon = toRad(x2);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;
    return distance.toFixed(2);
  };
  function handleCoupon() {
    setDotLoader(true);
    if (couponText) {
      let data = {
        coupon: couponText,
        subtotal: totalPrice,
        user_id: res?.id,
      };
      setTimeout(() => {
        dispatch(couponServiceHandler(data)).then(async (originalPromiseResult) => {
          setShowCoupon(originalPromiseResult.payload.data.success);
          if (originalPromiseResult.payload.data.success) {
            getTotal();
            SetCouponData(originalPromiseResult.payload.data);
          } else {
            getTotal();
          }
        });
        setDotLoader(false);
      }, 2000);
    } else {
      setDotLoader(false)
    }
  }
  useEffect(() => {
    getTotal();
  }, [totalPrice, couponData, type]);
  function handlepayment() {
    if (res?.default_address !== null) {
      navigation.navigate('EarningsPage', { type: type, totalPay: totalPay, comment: comment });
    }
    else {
      navigation.navigate('MemberInfoPage');
    }
  }
  const itemContainerMarginBottom = showCoupon !== null ? (dotLoader ? 20 : 0) : 20;

  return (
    <>
      {loader ? <OverlayLoader /> : (
        productCount > 0 ? (
          <SafeAreaView style={styles.safeArea}>
            <ScrollView>
              <TopBarComponent homeIcon={true} backIcon={true} goBackPage="MenuScreenOne" />
              <View style={styles.containerview}>


                <View style={styles.centerViewContainer}>
                  <DeliveryScreen />
                  <View>
                    <Text style={styles.text}>
                      This store provides both Delivery and Self-Pickup options. {'\n'}
                      You have selected:
                      <TouchableOpacity onPress={() => setModal(true)}>
                        <Text style={styles.highlightedText}> {type} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModal(true)}>
                        <Text style={styles.changeText}>(Change)</Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                  <View style={styles.itemcontainer}>
                    <Text style={styles.itemtext}>Items in Cart</Text>
                    <FlatList
                      data={items}
                      renderItem={({ item }) => <CartItem item={item} />}
                      keyExtractor={(item) => item.id.toString()}
                      style={{
                        borderColor: '#ddd',
                        borderBottomWidth: 1,
                      }}
                    />
                    <TextInput
                      style={{ color: 'black' }}
                      multiline={true}
                      placeholder='Write your comment/suggestion for the  rest...!'
                      placeholderTextColor='black'
                      onChangeText={(text) => setComment(text)}
                    />
                  </View>
                  <CouponSection
                    couponText={couponText}
                    setCouponText={setCouponText}
                    handleCoupon={handleCoupon}
                    dotLoader={dotLoader}
                    showCoupon={showCoupon}
                    couponData={couponData}
                    itemContainerMarginBottom={itemContainerMarginBottom}
                  />
                  <View style={{ marginBottom: 100 }}>

                    <BillDetails
                      totalPrice={totalPrice}
                      getGst={getGst}
                      totalPay={totalPay}
                      type={type}
                      res={res}
                      showCoupon={showCoupon}
                      couponData={couponData}
                      getpercentageamount={getpercentageamount}
                      getDeliveryamount={getDeliveryamount}
                      distance={distance}
                      runningOrder={runningOrder}
                    />
                    <ZigzagLines
                      width={deviceWidth}
                      backgroundColor="#FFF"
                      color="#DEDEDE"
                      style={{ marginBottom: 20 }}
                    />
                  </View>
                </View>
                <DeliveryOptionsModal
                  openModal={openModal}
                  setModal={setModal}
                  handleDeliveryPress={handleDeliveryPress}
                />

              </View>
            </ScrollView>
            <View style={{ ...styles.bottomButtomViewStyle, backgroundColor: res?.default_address !== null ? 'green' : 'orange' }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={handlepayment}>
                <View style={styles.addOrderViewContainerStyle}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 600, textAlign: 'center' }}>{res?.default_address !== null ? `PROCEED TO CHECKOUT` : `ADD ADDRESS`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.safeArea}>
            <TopBarComponent homeIcon={true} backIcon={true} />
            <View style={styles.emptyContainer}>
              <Image source={empty} style={styles.emptyImg} />
              <Text style={styles.emptyText}>Your Cart is Empty</Text>
            </View>
          </SafeAreaView>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // marginHorizontal: 13,
  },
  containerview: {
    marginHorizontal: 13,
    // marginBottom:100
  },
  centerViewContainer: {
    width: '100%',
    backgroundColor: '#F2F4F9',
  },
  text: {
    fontSize: 12,
    color: '#333',
    marginBottom: metrices(3),
  },
  highlightedText: {
    color: 'rgb(252, 128, 25)',
    fontSize: 14,
    fontWeight: '700',
  },
  changeText: {
    fontSize: 12,
    color: '#333',
    textDecorationLine: 'underline',
  },
  itemcontainer: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 12,
  },
  itemtext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingBottom: metrices(2),
    borderColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    height: '50%',
    width: '80%',
    resizeMode: 'contain',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: 'orange',
    textShadowColor: '#555',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bottomButtomViewStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60, // Adjust the height according to your design
    alignItems: 'center',
  },
  bottomButtonTouchContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomButtonContainer: {
    flex: 1, // Take up all available space in the row
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Distribute space between items
    alignItems: 'center', // Center items vertically
    paddingHorizontal: 20, // Adjust padding as needed
    textAlign: 'center'
  },
  buttonStyle: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center',
    flex: 1, // Take up all available space in the row
    justifyContent: 'space-between', // Distribute space between items
    // paddingHorizontal: 20, // Center items vertically
    textAlign: 'center'
  },
  addOrderViewContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
});

export default Cart;