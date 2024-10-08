import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { metrices, width } from '../assets/metrices';
import LinearGradient from 'react-native-linear-gradient';
import TopBarComponent from '../components/TopBarComponent';
import { MemberShipCardDetails } from '../assets/constantsDummy';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/compat';
import { useNavigation } from '@react-navigation/native';
function QrCodeScreen(): React.JSX.Element {
  const [phone, setPhone] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    // Function to retrieve data from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedPhone = await AsyncStorage.getItem('QRCodeData');
        if (storedPhone) {
          // Find the index of the country code
          const index = storedPhone.indexOf('+61');
          // Slice the string after the country code
          const slicedData = index !== -1 ? storedPhone.slice(index + 3) : storedPhone;
          setPhone(slicedData); // Set phone state with sliced phone number
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    // Call the retrieveData function
    retrieveData();
  }, []);


  // Combine 'SML' with the retrieved phone number
  const data = `%SML ${phone}`;
  const renderItemContent = ({ item, index }) => {
    return (
      <View style={{ width: "90%", marginTop: index === 0 ? 15 : 0, marginBottom: 16, height: metrices(20), alignSelf: "center" }}>
        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.8, 0.9]}
          colors={item.color}
          style={{ flex: 1, borderRadius: 8, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: '60%', height: "100%", padding: 8, gap: 8 }}>
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }} numberOfLines={1}>{item.title}</Text>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{item.subTitle}</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>valid Thiru: {item.validThiru}</Text>
          </View>
          <View style={{ width: '38%', height: "100%", padding: 8 }}>
            <View style={{ height: '70%' }}></View>
            <View>
              <Text style={{ color: 'white', fontSize: 20 }}>$ {item.price}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
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
    <SafeAreaView style={styles.container} >
      {/* <TopBarComponent
        title="Membership Card"
        backIcon={true}
        homeIcon={false}
      /> */}
      <HeaderComponent
        onPressHamburger={handleDrawerNavigation}
        onPressRoute={() => handleRouteNavigation('goback')}
      />
      <View style={styles.QrCodeContainer} >
        <Text style={styles.textStyle}> Scan the QR Code for your details < /Text>
          <QRCode value={data} size={200} color="black" backgroundColor="white" />
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        {/* <Text style={styles.textStyle}>Membership cards for you..</Text> */}
        <FlatList
          data={MemberShipCardDetails}
          keyExtractor={(item) => item.id}
          renderItem={renderItemContent}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width(100),
    height: '100%',
    // backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  },
  QrCodeContainer: {
    width: "100%",
    height: metrices(40),
    backgroundColor: 'white',
    justifyContent: 'center',
    gap: 50,
    alignItems: 'center',
  },
});
export default QrCodeScreen;
