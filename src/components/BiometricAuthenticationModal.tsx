import React, { useEffect, useState } from 'react';
import { View, Modal, Button, Text } from 'react-native';
import TouchID from 'react-native-touch-id';

const BiometricAuthenticationModal = ({ visible, onClose }) => {
  const [authenticationResult, setAuthenticationResult] = useState(null);

 useEffect(()=>{

 },[])

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Authenticate with biometric</Text>
          <Button title="Authenticate" onPress={authenticateWithBiometric} />
          {authenticationResult && (
            <Text>{authenticationResult === true ? 'Authentication successful' : 'Authentication failed'}</Text>
          )}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default BiometricAuthenticationModal;
