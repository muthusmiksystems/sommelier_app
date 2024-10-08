import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Define the props type for better type safety
type TopBarProps = {
  backIcon?: boolean;
  homeIcon?: boolean;
  title: string;
  goBackPage?: string; // Optional prop for navigation to a specific page
};

const TopBarComponent: React.FC<TopBarProps> = ({ backIcon, homeIcon, title, goBackPage }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (goBackPage) {
      navigation.navigate(goBackPage); // Navigate to specific page
    } else {
      navigation.goBack(); // Go back to previous screen
    }
  };

  return (
    <View style={styles.topBarViewStyle}>
      <View style={styles.backButtonContainer}>
        {backIcon && (
          <TouchableOpacity
            style={styles.backTouchContainerStyle}
            onPress={handleBackPress}
          >
            <Entypo name={'chevron-left'} size={30} color={'black'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainerStyle}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.sideIconStyle}>
        {homeIcon && (
          <TouchableOpacity
            style={styles.sideIconTouchStyle}
            onPress={() => navigation.navigate('HomeDrawerPage')}
          >
            <SimpleLineIcons name={'home'} size={30} color={'black'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarViewStyle: {
    width: '100%',
    height: 60, 
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: '#F2F4F9',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backButtonContainer: {
    width: '16%',
    height: '100%',
    alignItems: 'center',
  },
  backTouchContainerStyle: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainerStyle: {
    width: '64%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
  },
  sideIconStyle: {
    width: '16%',
    height: '100%',
    alignItems: 'center',
  },
  sideIconTouchStyle: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TopBarComponent;
