import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Biometrics from 'react-native-biometrics';

const FaceIDAuth: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const handleAuthenticate = async () => {
        try {
            const { success } = await Biometrics.simplePrompt();

            if (success) {
                setAuthenticated(true);
            } else {
                // Handle authentication failure
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Authenticate with Face ID</Text>
            <TouchableOpacity onPress={handleAuthenticate}>
                <Text style={styles.buttonText}>Authenticate</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'blue',
        fontSize: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: 'red',
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'red',
    },
});

export default FaceIDAuth;
