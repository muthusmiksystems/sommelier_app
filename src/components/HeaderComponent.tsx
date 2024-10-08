import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import loginImage from '../assets/images/logobg.png';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/compat';
import {metrices} from '../assets/metrices';
import { useSelector } from 'react-redux';
import { url } from '../assets/constantsDummy';

interface HeaderComponentProps {
  onPressHamburger: (arg: string) => void;
  onPressRoute:(arg: string)=> void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  onPressHamburger,
  onPressRoute,
}) => {
  const info1 = useSelector((state) => state?.getRestaurentDetailsServiceData?.data)
  const navigation = useNavigation();
  const [first, setFirst] = useState('')
  useEffect(()=>{
    setFirst(info1)
      },[info1])
      const imageUrl = imageName => {
        return url + imageName;
      };
  return (
    <View style={styles.topViewStyle}>
      <View style={styles.imageViewStyle}>
        <TouchableOpacity onPress={onPressHamburger}>
          <SimpleLineIcons name={'menu'} size={30} color={'black'} />
        </TouchableOpacity>
        <Image
          source={{ uri: imageUrl(first?.image) }}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={{alignSelf: 'center', marginRight: 10}}>
        <TouchableOpacity
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPressRoute}>
          {/* Use onPressRoute to navigate to the desired route */}
          <Entypo name={'chevron-right'} size={30} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default HeaderComponent;
