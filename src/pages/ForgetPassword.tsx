import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import loginImage from '../assets/images/logobg.png';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInputComponent from '../components/TextInput';
import LoginWithGoogle from '../components/LoginWithGoogle';
import ButtonComponent from '../components/ButtonComponent';
import { metrices } from '../assets/metrices';
import AuthTopStyleComponent from '../components/AuthTopStyleComponent';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function ForgetPassword(): React.JSX.Element {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handleValidation = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      errors.email = 'Invalid email format';
    }
    setError(errors);
    return errors;
  };
  const handleProceed = () => {
    const validation = handleValidation();
  };
  return (
    <KeyboardAvoidingView style={styles.mainStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AuthTopStyleComponent title='FORGET PASSWORD' subTitle='Enter your email to send OTP' />

      <View style={styles.scrollViewStyle}>
        <View style={styles.subViewTwoStyle}>
          <View style={{ width: "100%" }}>
            <TextInputComponent
              placeholder={'Email'}
              style={styles.textInputStyle}
              value={email}
              onChangeText={(text: any) => {
                setEmail(text);
                setError({ ...error, email: '' });
              }}
              hasError={error.email}
            />
          </View>
          <ButtonComponent
            onPress={() => handleProceed()}
            placeHolder="PROCEED"
          />
          {/* <Text
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            -- OR --
          </Text>
          <LoginWithGoogle /> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: "white"
  },
  scrollViewStyle: {
    width: '100%',
    height: metrices(68),
    backgroundColor: 'white'
  },
  subViewTwoStyle: {
    width: '100%',
    height: '30%',
    marginTop: metrices(12),
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  textInputStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 54,
    paddingHorizontal: 14,
    fontSize: 16,
    color: 'black',
    borderRadius: 6,
    backgroundColor: '#F2F4F9',
  },
});

export default ForgetPassword;
