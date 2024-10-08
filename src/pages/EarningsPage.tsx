import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { CardField, createPaymentMethod, useStripe } from '@stripe/stripe-react-native';
import Axios from 'axios';
import TopBarComponent from '../components/TopBarComponent';
import OverlayLoader from '../components/OverlayLoader';
import { useNavigation } from '@react-navigation/native';
import stripe from '../assets/images/stripe.png';
import { useDispatch, useSelector } from 'react-redux';
import { STRIPE_PAYMENT } from "../store/constant"; // Adjust the path according to your project structure
import { placeOrderServiceHandler } from '../store/services/PlaceOrderService';

function EarningsPage({ route }) {
  const { type, totalPay, comment } = route.params;
  const navigation = useNavigation();
  const { confirmPayment } = useStripe();
  const [loader, setLoader] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const products = useSelector(state => state.AddProductData.products);
  const res = useSelector(state => state.loginserviceData);
  const restaurant = useSelector(state => state?.getRestaurentDetailsServiceData.data)
  const couponServiceData = useSelector(state => state?.couponServiceData.data)
  const [operationData, setOperationData] = useState();
  const totalQuantity = Object.values(products).reduce((sum, item) => sum + item?.quantity, 0);

  const formattedData = { order: Object.values(products) };

  const dispatch = useDispatch();

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  const handlePayment = async () => {
    setShowPayment(!showPayment);

    if (showPayment && cardDetails?.complete) {

      try {
        // Create a payment method using the card details
        const { paymentMethod, error: paymentMethodError } = await createPaymentMethod({
          paymentMethodType: 'Card',
          card: {
            number: cardDetails?.number,
            exp_month: cardDetails?.expiryMonth,
            exp_year: cardDetails?.expiryYear,
            cvc: cardDetails?.cvc,
          },
        });

        if (paymentMethodError) {
          Alert.alert("Payment Method Error", paymentMethodError.message);
          return;
        }
        console.log('paymentMethod=====',paymentMethod)
        // Call your backend to create a PaymentIntent with the payment method ID
        const response = await Axios.post(STRIPE_PAYMENT, {
          user_id: res?.data?.id,
          amount: totalPay * 100, // Amount in smallest currency unit, e.g., cents
          currency: "AUD",
          payment_method: paymentMethod.id, // Include the payment method ID
          payment_method_types: ["card"],
          restaurant_id: restaurant.id
        });
        console.log("response===",response)
        alert(response)
        if (response.data && response.data.client_secret) {
          Alert.alert("Payment Successful", `Payment for ${response.data.amount / 100} AUD succeeded!`);
          handleplaceOrder()
        }
      } catch (error) {
        console.log('err--', error)
        Alert.alert("Payment Error", error?.message);
      }
    } else {
      Alert.alert("Invalid Card Details", "Please enter valid card details before proceeding.");
    }
  };
  const handleplaceOrder = () => {
    // const user={
    //   user:res.data,
    //   phone:
    // }
    const payload = {
      user_id: res?.data?.id,
      user: res,
      order: formattedData.order,
      coupon: couponServiceData,
      order_comment: comment,
      total: {
        productQuantity: totalQuantity,
        totalPrice: totalPay
      },
      method: "STRIPE",
      payment_token: "",
      delivery_type: type === 'DELIVERY' ? 1 : 2,
      partial_wallet: false,
      dis: 0,
      pending_payment: false,
      tipAmount: null,
      cash_change_amount: null,
      schedule_date: null,
      schedule_slot: null
    }
    dispatch(placeOrderServiceHandler(payload)).then(async (originalPromiseResult) => {
      console.log('originalPromiseResult', originalPromiseResult)
    });
  }


  if (loader) {
    return <OverlayLoader />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TopBarComponent homeIcon={true} backIcon={true} />
        <View style={styles.containerView}>
          <Text style={styles.topText}>Select your preferred payment method</Text>

          <View>
            <TouchableOpacity style={styles.paymentOptionContainer} onPress={() => setShowPayment(!showPayment)}>
              <View>
                <Text style={styles.paymentMethod}>STRIPE</Text>
                <Text style={styles.paymentDescription}>Online Payment</Text>
              </View>
              <Image source={stripe} style={styles.paymentImage} />
            </TouchableOpacity>
          </View>
        </View>
        {showPayment && (
          <>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#333333',
                borderColor: '#007BFF',
                borderWidth: 1,
                borderRadius: 10,
                fontFamily: 'Helvetica Neue',
                fontSize: 16,
                placeholderColor: '#A0A0A0',
              }}
              style={{
                width: '100%',
                height: 60,
                marginVertical: 20,
                padding: 12,
                borderRadius: 8,
                borderColor: '#007BFF',
                borderWidth: 1,
                backgroundColor: '#F8F8F8',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3.5,
                elevation: 5,
              }}
              onCardChange={(details) => {
                setCardDetails(details);
              }}
            />

            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  containerView: {
    margin: 15,
  },
  topText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentOptionContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paymentMethod: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  paymentDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  paymentImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  payButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EarningsPage;
