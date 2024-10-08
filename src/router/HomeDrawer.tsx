  import React, { useEffect, useState } from 'react';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  import Sidebar from './SideBar';
  import MenuScreen from '../pages/MenuScreen';
  import TouchID from 'react-native-touch-id';
  import { Alert } from 'react-native';
  import { useSelector } from 'react-redux';
  import TabNavigator from '../router/BottomTabBar'
import { useNavigation } from '@react-navigation/native';
import Booking from '../pages/Booking';
import DetailsPage from '../pages/DetailsPage';
import Cart from '../pages/Cart';
import MemberInfoPage from '../pages/MemberInfo';
import QrCodeScreen from '../pages/QrCode';

  const HomeDrawerPage = ({ route }) => {
    const { fingerprint } = route?.params ? route?.params : 0;
    const navigation = useNavigation();
    const Drawer = createDrawerNavigator();
    const [isProtectedScreenVisible, setIsProtectedScreenVisible] = useState(false);
    
    useEffect(() => {
      
      if (fingerprint === 1) {
        TouchID.isSupported()
        .then(biometryType => {
          const optionalConfigObject = {
            title: 'Authentication Required', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: '', // Android
            fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
          };
          
          TouchID.authenticate('Fingerprint Authentication', optionalConfigObject)
            .then(success => {
              setIsProtectedScreenVisible(true);
            })
            .catch(error => {
              Alert.alert("Your device is not support fingerprint")
              navigation.navigate('Login');
            });
        })
        .catch(error => {
          console.log("Biometry support check failed:", error);
          navigation.navigate('Login');
        });
  
      }
    }, [])
    return (
      <Drawer.Navigator
        drawerContent={props => <Sidebar {...props} />}
        initialRouteName="MenuScreenOne"
        screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="MenuScreenOne" component={MenuScreen} />
        <Drawer.Screen name="Booking" component={Booking} />
        <Drawer.Screen name="DetailsPage" component={DetailsPage} />
        <Drawer.Screen name="CartPage" component={Cart} />
        <Drawer.Screen name="MemberInfoPage" component={MemberInfoPage} />
        <Drawer.Screen name="QrCodeScreen" component={QrCodeScreen} />
        {/* <Drawer.Screen name="Tabs" component={TabNavigator}  /> */}
      </Drawer.Navigator>
    );
  };

  export default HomeDrawerPage;





//   import React, { useEffect, useState } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Sidebar from './SideBar';
// import MenuScreen from '../pages/MenuScreen';
// import BiometricAuthenticationModal from '../components/BiometricAuthenticationModal'; // Import BiometricAuthenticationModal
// import TouchID from 'react-native-touch-id';
// import { Alert } from 'react-native';
// import { useSelector } from 'react-redux';

// const HomeDrawerPage = ({ route }) => {
//   const { fingerprint } = route.params;
//   const Drawer = createDrawerNavigator();
//   const [isBiometricModalVisible, setIsBiometricModalVisible] = useState(false); // State variable for modal visibility

//   useEffect(() => {
//     if (fingerprint === 1) {
//       setIsBiometricModalVisible(true); // Show modal when fingerprint authentication is required
//     }
//   }, [fingerprint]);

//   const handleBiometricAuthentication = () => {
//     TouchID.authenticate('Authenticate with biometric')
//       .then(success => {
//         console.log('Biometric authentication successful:', success);
//         setIsBiometricModalVisible(false); // Hide modal on successful authentication
//       })
//       .catch(error => {
//         console.log('Biometric authentication error:', error);
//         setIsBiometricModalVisible(false); // Hide modal on authentication error
//         Alert.alert('Biometric authentication failed');
//       });
//   };
// function handleClose(){
  
// }
//   return (
//     <>
//       <Drawer.Navigator
//         drawerContent={props => <Sidebar {...props} />}
//         initialRouteName="MenuScreenOne"
//         screenOptions={{ headerShown: false }}>
//         <Drawer.Screen name="MenuScreenOne" component={MenuScreen} />
//       </Drawer.Navigator>
//       <BiometricAuthenticationModal // Render BiometricAuthenticationModal
//         visible={isBiometricModalVisible}
//         onClose={() => isBiometricModalVisible}
//         setIsBiometricModalVisible={setIsBiometricModalVisible}
//       />
//     </>
//   );
// };

// export default HomeDrawerPage;
