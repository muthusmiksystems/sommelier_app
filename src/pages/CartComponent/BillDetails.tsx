import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BillDetails = ({ totalPrice, getGst, totalPay, type, res, showCoupon, couponData, getpercentageamount, getDeliveryamount, distance, runningOrder }: any) => {
  const navigation = useNavigation();
  function handlecheckrunningorder() {
    navigation.navigate('RunningOrder', { res: res });
  }
  const getTotalamt = () => {
    const percentage_discount = getpercentageamount() ? getpercentageamount() : 0
    const delivery = getDeliveryamount() ? getDeliveryamount() : 0
    return totalPrice + delivery - percentage_discount
  }
  return (
    <View style={styles.billcontainer}>
      {runningOrder &&
        <View style={styles.runningordercontainer} >
          <TouchableOpacity onPress={handlecheckrunningorder}>
            <Text style={styles.runningOrderText}>You have some on-going orders. VIEW {`>`}</Text>
          </TouchableOpacity>

        </View>
      }
      <View style={styles.bill}>
        <Text style={styles.itemtext}>Bill Details</Text>
        <View style={styles.pricerow}>
          <Text style={styles.pricerowText}>Item Total</Text>
          <Text style={styles.pricerowValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        {showCoupon && (
          <View style={styles.pricerow}>
            <Text style={{ ...styles.pricerowText, color: "green" }}>Coupon</Text>
            <Text style={{ ...styles.pricerowText, color: "green" }}>${couponData?.discount_type === 'AMOUNT' ? `${couponData?.discount}` : `${couponData?.discount} - (${getpercentageamount()})`}</Text>
          </View>
        )}
        {res?.default_address !== null && (
          <View style={styles.pricerow}>
            <Text style={styles.pricerowText}>
              {type === 'DELIVERY' ? `Delivery Charges` : 'Delivery Charge'}
            </Text>
            <Text style={styles.pricerowText}>
              ${type === 'DELIVERY' ? `5` : '0'}
            </Text>
            {/* <Text style={styles.pricerowValue}>${res?.delivery_charge_type === 'FIXED' ? '0' : getDeliveryamount()}</Text> */}
          </View>
        )}


        {/* <View style={styles.pricerowlast}>
          <Text style={styles.totalPrice}>Total</Text>
          <Text style={styles.totalPrice}>${getTotalamt().toFixed(2)}</Text>
        </View> */}
        <View style={styles.pricerow}>
          <Text style={{ ...styles.pricerowText, color: "red" }}>GST (10%)</Text>
          <Text style={{ ...styles.pricerowText, color: "red" }}>${getGst(totalPrice).toFixed(2)}</Text>
        </View>
        <View style={styles.pricerowlast}>
          <Text style={styles.totalPrice}>To Pay</Text>
          <Text style={styles.totalPrice}>${totalPay}</Text>
        </View>
        {type !== 'DELIVERY' && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'red', fontWeight: '700' }}>You have selected Self Pickup.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  billcontainer: {
    alignSelf: 'center',
    width: '100%',
    // paddingVertical: 16,
    // paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bill: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  pricerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pricerowlast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  pricerowText: {
    fontSize: 16,
    color: '#333',
  },
  pricerowValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  runningordercontainer: {
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  runningOrderText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center'
  },
});

export default BillDetails;