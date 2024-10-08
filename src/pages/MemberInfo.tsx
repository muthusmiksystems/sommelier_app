import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import { metrices, width } from '../assets/metrices';
import ImagePicker from 'react-native-image-crop-picker';
import userGif from '../assets/images/userGif.gif';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopBarComponent from '../components/TopBarComponent';
import ProfileDetails from '../components/profile/ProfileDetails';
import { emailPattern } from '../assets/patterns/regrex';
import parsePhoneNumber from 'libphonenumber-js';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { paylod, url } from '../assets/constantsDummy';
import { saveAddressServiceHandler } from '../store/services/SaveAddressService';
import { logindetails } from '../store/services/loginService';
import { updateProfileServiceHandler } from '../store/services/UpdateProfileService';
import HeaderComponent from '../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/compat';
function MemberInfoPage() {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [modalState, setModalState] = useState(false);
  const [profilePic, setProfilePic] = useState();
  
  const [edit, setEdit] = useState(0);
  const info = useSelector((state) => state?.logindetailsdata?.data)
  // const [firstName, lastName] = info?.name ? info.name.split(' ') : ['', ''];
  const [profileImage, setProfileImage] = useState(info?.avatar ?  info?.avatar  : '');
  const [registerDetails, setRegisterDetails] = useState({
    first_name: info?.first_name ? info?.first_name : '',
    last_name: info?.last_name ? info?.last_name : '',
    email: info?.email ? info?.email : '',
    address: info[0]?.address ? info[0]?.address : info?.default_address?.address ? info?.default_address?.address : '',
    phone: info?.phone ? info?.phone : '',
    dob: info?.dob ? info?.dob : '',
  });
  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
  });

  const openCamera = async () => {
    setModalState(false);
    if (Platform.OS == 'android' && (await checkForPermissions())) {
     ;
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
      })
        .then(image => {
          let url = image?.path.split('/');
          const file = {
            name: url[11],
            type: image.mime,
            uri: image.path,
          };
          setProfilePic(file);
          setProfileImage(image);
        })
        .catch(err => console.log(err));
    }
  };
  const openGallery = async () => {
    setModalState(false);
    if (Platform.OS == 'android' && (await checkForPermissions())) {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
      })
        .then(image => {
          let url = image?.path.split('/');
          const file = {
            name: url[11],
            type: image.mime,
            uri: image.path,
          };
          setProfilePic(file);
          setProfileImage(image);
        })
        .catch(err => console.log(err));
    }
  };
  const checkForPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        ToastAndroid.showWithGravity(
          'Camera and gallery permissions required',
          ToastAndroid.CENTER,
          ToastAndroid.SHORT,
        );
        return false;
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        'Camera and gallery permissions required',
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
      return false;
    }
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
      const prefix = phoneNumber.slice(0, 2); // Extract the prefix "+61"
      const remainingNumber = phoneNumber;
      return (
        remainingNumber.length === 10 &&
        remainingNumber.startsWith('04')
      );
    } catch (error) {
      return false;
    }
  };

  const handleValidation = () => {
    const errors = {};
    if (!registerDetails.first_name) {
      errors.first_name = 'First name is required';
    } else if (registerDetails.first_name?.length < 3) {
      errors.first_name = 'First name should have minimum 3 characters';
    }
    if (registerDetails.last_name) {
      if (registerDetails.last_name?.length < 3) {
        errors.last_name = 'Last name should have minimum 3 characters';
      }
    }
    if (!registerDetails.email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(registerDetails.email)) {
      errors.email = 'Invalid email format';
    }
    if (!registerDetails.address) {
      errors.address = 'Address is required';
    } else if (registerDetails.address?.length < 8) {
      errors.address = 'Address should have minimum 8 characters';
    }
    if (!registerDetails.phone) {
      errors.phone = 'Mobile number is required';
    } else if (!isValidPhoneNumber(registerDetails.phone)) {
      errors.phone = 'Invalid mobile number format. Please enter Australian mobile number starting with 04 (e.g., +61 412345678)';
    }
    if (!registerDetails.dob) {
      errors.dob = 'DOB  is required';
    } 
    setError(errors);
    return errors;
  };

  const handleRegisterFunction = async () => {
    const validation = handleValidation();
    if (Object.keys(validation).length === 0) {
      const data = {
        id: info?.id,
        address: registerDetails.address
      }
      const formData = new FormData();
      formData.append('id', info?.id);
      formData.append('first_name', registerDetails.first_name);
      formData.append('last_name', registerDetails.last_name);
      formData.append('address', registerDetails.address);
      formData.append('phone', registerDetails.phone);
      formData.append('email', registerDetails.email);
      formData.append('dob', registerDetails.dob);
      if (profilePic) {
        formData.append('image', {
          name: profilePic.name,
          type: profilePic.type,
          uri: Platform.OS === "android" ? profilePic.uri : profilePic.uri.replace("file://", "")
        });
      }
      dispatch(updateProfileServiceHandler(formData))
        .then(async (profilepayload: any) => {
          // setRegisterDetails(profilepayload)
          const newAddress = profilepayload.payload[0]?.address;
          const updatedData = {
            ...info,
            address: newAddress
          };
          if (profilepayload.payload.success === true) {
            ToastAndroid.showWithGravity("User updated in succesfully", ToastAndroid.CENTER, ToastAndroid.LONG);
          }
          else if (profilepayload.payload.success === false) {
            ToastAndroid.showWithGravity("Phone number already registered", ToastAndroid.CENTER, ToastAndroid.LONG);
            navigation.navigate('HomeDrawerPage');
          }
          else {
            ToastAndroid.showWithGravity("User updated in failed", ToastAndroid.CENTER, ToastAndroid.LONG);
            navigation.navigate('HomeDrawerPage');
          }
          dispatch(logindetails(profilepayload.payload?.data));
          // Handle success or other logic here
        })
        .catch((error: any) => {
          console.log("error", error)
          // Handle error or other logic here
        })
      navigation.goBack();
    } else {
      console.log('Error', registerDetails);
    }
  };
  const imageUrl = imageName => {
    return url + imageName;
  };
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
    <KeyboardAvoidingView style={styles.container}>
      {/* <TopBarComponent title="Member Info" backIcon={true} homeIcon={false} /> */}
      <HeaderComponent
                        onPressHamburger={handleDrawerNavigation}
                        onPressRoute={() => handleRouteNavigation('goback')}
                    />
      <View style={styles.topViewStyle}>
        <View style={styles.subTopViewStyle}>
          <Text style={{ fontSize: 26, color: 'black' }}>
            {registerDetails.first_name} {registerDetails.last_name}
          </Text>
          <View>
            <Text style={styles.subTopViewText}>{registerDetails.phone}</Text>
            <Text style={styles.subTopViewText}>{registerDetails.email}</Text>
          </View>
        </View>
        <View style={styles.imageViewStyle}>
          <ImageBackground
            // source={profileImage ? { uri: profileImage.path } : userGif}
            source={
              profileImage && profileImage.path
                ? { uri: imageUrl(profileImage.path) }
                : (profileImage 
                ? { uri:imageUrl( profileImage) }
                : userGif)
            }
            resizeMode="cover"
            style={{ width: '86%', height: '90%' }}
            imageStyle={{ borderRadius: 7 }}>
            <TouchableOpacity
              style={styles.profileImgTouchStyle}
              onPress={() => setModalState(true)}>
              <Text style={{ color: 'white', fontSize: 12 }}>Change picture</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
      <ScrollView>
        <ProfileDetails
          registerDetails={registerDetails}
          setRegisterDetails={setRegisterDetails}
          error={error}
          setError={setError}
          edit={edit}
          setEdit={setEdit}
        />
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: metrices(8),
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {edit === 0 ? (
          <TouchableOpacity
            onPress={() => setEdit(1)}
            style={styles.bottomButtonStyle}>
            <Text style={{ fontSize: 18, color: 'black' }}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleRegisterFunction()}
            style={styles.bottomButtonStyle}>
            <Text style={{ fontSize: 18, color: 'black' }}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        visible={modalState}
        transparent={true}
        onRequestClose={() => {
          setModalState(false);
        }}
        animationType="fade">
        <View style={styles.centeredView}>
          <View style={[styles.MainAlertView]}>
            <Text style={{ fontSize: 18, color: 'black', marginTop: 20 }}>
              Select where to choose profile picture
            </Text>
            <View style={styles.iconViewStyle}>
              <TouchableOpacity
                onPress={() => openCamera()}
                style={styles.modalTouchStyle}>
                <Ionicons style={styles.iconStyle} name="camera" />
                <Text style={styles.modalTextStyle}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openGallery()}
                style={styles.modalTouchStyle}>
                <Ionicons style={styles.iconStyle} name="images" />
                <Text style={styles.modalTextStyle}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width(100),
    height: '100%',
    backgroundColor: '#F2F4F9',
  },
  topViewStyle: {
    width: '100%',
    height: metrices(25),
    backgroundColor: '#F2F4F9',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBlockColor: 'black',
  },
  subTopViewStyle: {
    width: '60%',
    height: '90%',
    paddingTop: '5%',
    paddingLeft: '6%',
    justifyContent: 'center',
  },
  subTopViewText: {
    fontSize: 20,
    color: 'grey',
  },
  imageViewStyle: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textViewConatiner: {
    marginTop: 18,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    width: '80%',
  },
  titleTextStyle: {
    color: 'grey',
    fontSize: 18,
    width: '18%',
  },
  bottomButtonStyle: {
    width: '40%',
    height: '80%',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainAlertView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '100%',
    borderColor: '#fff',
  },
  profileImgTouchStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '24%',
    bottom: 12,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    width: '86%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  iconViewStyle: {
    flexDirection: 'row',
    width: '100%',
    height: metrices(20),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalTouchStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#FC8019',
    fontSize: 60,
  },
  modalTextStyle: {
    fontSize: 16,
    color: '#000',
  },
});
export default MemberInfoPage;
