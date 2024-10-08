import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../store/services/AddProductService';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(addProduct({ ...item, quantity: 1 }));
  };

  const handleDecrement = (id) => {
    dispatch(removeProduct({ id }));
  };

  const price = (item) => Number(item.quantity) * item.price;

  return (
    <View style={styles.itemRow}>
      <Image 
        source={item.is_veg ? require('../../assets/images/veg-icon-bg.png') : require('../../assets/images/non-veg-icon-bg.png')}
        style={styles.icon}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.countrow}>
          <TouchableOpacity 
            style={{ ...styles.itemCount, padding: item.count > 1 ? 1 : 9 }}
            onPress={() => handleDecrement(item.id)}
          >
            <Text style={{ color: "black" }}>{item.quantity > 1 ? '-' : <SimpleLineIcons name={'trash'} size={14} color={'red'} />}</Text>
          </TouchableOpacity>
          <Text style={{ ...styles.itemCount, padding: 10 }}>{item.quantity}</Text>
          <TouchableOpacity 
            style={{ ...styles.itemCount, padding: 10 }}
            onPress={() => handleIncrement(item)}
          >
            <Text style={{ color: "black" }}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>${price(item).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
  },
  countrow: {
    flexDirection: 'row',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    width: '40%',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    padding: 10,
    flex: 1,
    textAlign: 'right',
  },
  itemCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    borderWidth: 0.5,
    borderColor: '#ddd',
    textAlign: 'center',
    minWidth: 30,
  },
  icon: {
    width: 20,
    height: 20,
  }
});

export default CartItem;