import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import loadingGif from '../assets/images/loadingfood.gif';

const { width, height } = Dimensions.get('window');

function OverlayLoader(): React.JSX.Element {
    return (
        <View style={styles.overlay}>
            <Image
                source={loadingGif}
                resizeMode='contain'
                style={styles.loaderImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
        width: '100%',
        height: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderImage: {
        width: width * 0.5, // 50% of screen width
        height: height * 0.5, // 50% of screen height
    },
});

export default OverlayLoader;
