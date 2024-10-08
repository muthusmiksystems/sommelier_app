import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { url } from '../assets/constantsDummy';

const HorizontalCardSlider = ({ data, handleDecrement, handleIncrement, products }: any): React.JSX.Element => {

    const renderItem = ({ item }: any) => {
        const productInStore = Object.values(products).find(product => product.name === item.name);

        return (
            <View style={styles.card}>
                {productInStore && productInStore.quantity > 0 && (
                    <Text style={styles.quantityText}>{productInStore.quantity}</Text>
                )}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: url + item.image }}
                        resizeMode="cover"
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailsRow}>
                        <Image
                            source={item.is_veg ? require('../assets/images/veg-icon-bg.png') : require('../assets/images/non-veg-icon-bg.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                    <Text style={styles.price}>${item.price}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.cartNumber}>
                            <Text style={styles.signs}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleIncrement(item)} style={styles.cartNumber}>
                            <Text style={styles.signs}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    quantityText: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'orange',
        color: 'white',
        paddingHorizontal: 10,
        borderBottomRightRadius: 15,
        zIndex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        borderColor:"white",
        borderRightWidth:3,
        borderBottomWidth:3,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 15,
        width: 220,
        height: 280,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        flexWrap: 'wrap',
        flex: 1,
    },
    detailsContainer: {
        marginTop: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        height:'20%',
        overflow:'hidden'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    price: {
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartNumber: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#f8f8f8',
    },
    signs: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default HorizontalCardSlider;
