import React from 'react';
import { Modal, TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import delivery from '../../assets/images/home-delivery.png';
import selfpickup from '../../assets/images/self-pickup.png';

const DeliveryOptionsModal = ({ openModal, setModal, handleDeliveryPress }) => {
  return (
    <Modal
      visible={openModal}
      transparent={true}
      onRequestClose={() => setModal(false)}
    >
      <TouchableOpacity
        onPress={() => setModal(false)}
        style={styles.modalContainer}
        activeOpacity={1}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Delivery Type</Text>
          <View style={styles.flexContainer}>
            <TouchableOpacity style={styles.flexItem} onPress={() => handleDeliveryPress("DELIVERY")}>
              <Image source={delivery} style={styles.image} />
              <Text style={styles.optionText}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexItem} onPress={() => handleDeliveryPress("Self-Pickup")}>
              <Image source={selfpickup} style={styles.image} />
              <Text style={styles.optionText}>Self-Pickup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '700',
    color: '#171717',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  flexItem: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  }
});

export default DeliveryOptionsModal;