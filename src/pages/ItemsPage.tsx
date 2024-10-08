import React from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import TopBarComponent from '../components/TopBarComponent';
import { useNavigation } from '@react-navigation/native';
import item from '../assets/images/explore.png';
import { metrices, width } from '../assets/metrices';

const windowWidth = Dimensions.get('window').width;

function CheckOutPage() {
  const navigation = useNavigation();

  // Sample menu items
  const menuItems = [
    { name: 'Burgers', price: '$10.99', image: require('../assets/images/pasta.png'), color: '#F2F4F9' }, // Gold
    { name: 'Pizzas', price: '$12.99', image: require('../assets/images/pasta.png'), color: '#F2F4F9' }, // Tomato
    { name: 'Pastas', price: '$11.99', image: require('../assets/images/pasta.png'), color: '#F2F4F9' }, // Dark Turquoise
    { name: 'Salads', price: '$8.99', image: require('../assets/images/pasta.png'), color: '#F2F4F9' }, // Green
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TopBarComponent backIcon={true} homeIcon={false} title="Items / Menu" />
      <ImageBackground source={item} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.menuItem, { backgroundColor: item.color }]}>
              <Image source={item.image} style={styles.menuItemImage} resizeMode="cover" />
              <View style={styles.menuItemDetails}>
                <Text style={styles.menuItemText}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 20,
    justifyContent: 'space-around', // Align items horizontally
  },
  menuItem: {
    width: windowWidth * 0.45, // Adjust the width dynamically
    borderRadius: 25,
    marginBottom: 20,
    height: 220, // Set a reasonable height
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#dba14b',
    backgroundColor: '#F2F4F9',
  },
  menuItemImage: {
    width: '70%', // Adjust the image width
    height: '50%', // Adjust the image height
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemDetails: {
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Change text color for better visibility
  },
  menuItemPrice: {
    fontSize: 16,
    color: '#000', // Change text color for better visibility
  },
});

export default CheckOutPage;
