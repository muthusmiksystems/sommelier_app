import React, { useEffect, useState } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import loginImage from '../assets/images/logobg.png';
import {metrices} from '../assets/metrices';
import { useSelector } from 'react-redux';
import { url } from '../assets/constantsDummy';

interface AuthTopStyleComponentProps {
  title: string;
  subTitle: string;
}

const AuthTopStyleComponent: React.FC<AuthTopStyleComponentProps> = ({
  title,
  subTitle,
}) => {
  const navigation = useNavigation();
  const info1 = useSelector((state) => state?.getRestaurentDetailsServiceData?.data);
  // const [phoneInputMobileNumber, setPhoneInputMobileNumber] = useState("8765432189")
  const [first, setFirst] = useState('')
  useEffect(()=>{
    setFirst(info1)
      },[info1])
      const imageUrl = imageName => {
        return url + imageName;
      };
  return (
    <View style={styles.subViewOneStyle}>
      <View style={styles.backButtonView}>
        {/* <TouchableOpacity
                    style={{ height: '100%', marginTop: 10 }}
                    onPress={() => navigation.goBack()}>
                    <Entypo name={'chevron-left'} size={30} color={'black'} />
                </TouchableOpacity> */}
      </View>
      <View style={styles.loginViewStyle}>
        <View style={styles.wordingsViewStyle}>
          <Text style={{fontSize: 24, color: '#FC8019',fontWeight:700}}>{title}</Text>
          <Text style={{fontSize: 16, color: 'black',paddingTop:'3%'}}>{subTitle}</Text>
        </View>
        <View style={styles.imageViewStyle}>
          <Image
            source={{ uri: imageUrl(first?.image) }}
            resizeMode="contain"
            style={{width: '100%', height: '70%'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subViewOneStyle: {
    width: '100%',
    height: metrices(18),
    backgroundColor: '#fff',
  },
  backButtonView: {
    width: '100%',
    height: '24%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingLeft: '4%',
  },
  loginViewStyle: {
    width: '100%',
    height: '76%',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  wordingsViewStyle: {
    width: '64%',
    height: '100%',
    gap: 8,
    // paddingTop:'8%',
    paddingLeft: '5%',
  },
  imageViewStyle: {
    width: '36%',
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default AuthTopStyleComponent;
