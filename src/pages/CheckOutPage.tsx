import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import TopBarComponent from '../components/TopBarComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import ICChecklist from '../assets/images/ic-checklist.png';
import {metrices} from '../assets/metrices';
import SelfPickup from '../components/tabViewScreen/SelfPickupScreen';
import {useNavigation} from '@react-navigation/native';

function CheckOutPage() {
  const navigation = useNavigation();
  const [awesomeAlert, setAwesomeAlert] = useState(false);
  const handlePayment = () => {
    setAwesomeAlert(!awesomeAlert);
  };
  return (
    <SafeAreaView>
      <TopBarComponent backIcon={true} homeIcon={false} title="Check Out" />
      <View style={styles.centerContainer}>
        <SelfPickup />
      </View>
      <View style={styles.buttonViewContainer}>
        <View style={styles.amountView}>
          <Text style={{fontSize: 24, color: 'white'}}>
            <Text style={{fontSize: 14}}>Total Amount:</Text> $1500
          </Text>
        </View>
        <View style={styles.touchButtonView}>
          <TouchableOpacity style={styles.touchButton} onPress={handlePayment}>
            <Text style={{fontSize: 20, color: 'white'}}>Pay now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AwesomeAlert
        show={awesomeAlert}
        showProgress={false}
        closeOnTouchOutside={true}
        customView={
          <View style={styles.alert}>
            <Image source={ICChecklist} style={styles.alertImage} />
            <Text style={styles.alertTitle}>Yuppy!!</Text>
            <Text style={styles.alertText}>Your Payment Receive to Seller</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  alert: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  centerContainer: {
    width: '100%',
    height: metrices(80),
    backgroundColor: 'white',
  },
  buttonViewContainer: {
    width: '100%',
    height: metrices(10),
    backgroundColor: '#FC8019',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  amountView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchButtonView: {
    width: '40%',
    height: '56%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginBottom: 20,
    marginTop: 30,
  },
  alertTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  alertText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 30,
  },
});

export default CheckOutPage;
