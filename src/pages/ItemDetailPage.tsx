import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import TopBarComponent from '../components/TopBarComponent';
import { useNavigation } from '@react-navigation/native';
import { metrices } from '../assets/metrices';
import hotelImage from '../assets/images/logobg.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Veg from '../assets/images/veg-icon-bg.png';
import NonVeg from '../assets/images/non-veg-icon-bg.png';
import { RestaurantInfoPalatte } from '../components/restaurant/RestaurantInfoPalette';

function ItemDetailPage({ route }): React.JSX.Element {
    const navigation = useNavigation();
    const detailsValue = route.params.details;
    const itemValue = route.params.item
    const [searchText, setSearchText] = useState('');
    const [searchTextError, setSearchTextError] = useState('');
    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    const handleCartItem = () => {
        navigation.navigate('BottomTabBar', { screen: 'CartPage' });
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#f2f2f2" }} >
            <TopBarComponent
                title={''}
                homeIcon={true}
                backIcon={true}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: "60%", backgroundColor: "#FFFF" }}>
                <RestaurantInfoPalatte Details={detailsValue} />
                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", margin: metrices(3) }}>
                    <Image
                        source={hotelImage}
                        resizeMode="contain"
                        style={{ width: '80%', height: metrices(30), borderRadius: 8 }}
                    />

                </View>
                <View style={{ flexDirection: "row", padding: metrices(2) }}>
                    <View style={{ flexDirection: "column", marginHorizontal: 2, width: "70%" }}>
                        <Text style={{ marginHorizontal: 2, fontWeight: "900", color: "black", fontSize: metrices(2) }}>
                            <Image
                                source={itemValue.isVegetarian ? Veg : NonVeg}
                                resizeMode="contain"
                                style={{ height: metrices(2.5), width: metrices(2.5), marginHorizontal: metrices(0.5) }}

                            /> {itemValue.dishName}</Text>
                        <Text style={{ margin: 2, color: "black", fontSize: metrices(1.5) }}> ${itemValue.price}</Text>
                        <View style={{ flexDirection: "row" }}>
                            {itemValue.isRecommended ? <Text style={{ backgroundColor: "#D53D4C", borderRadius: 10, textAlign: "center", color: "white", fontWeight: "700", marginHorizontal: 2, padding: 5, fontSize: metrices(1.5), }}  >Recommended</Text> : null}
                            {itemValue.isNew ? <Text style={{ backgroundColor: "#FF5722", borderRadius: 10, textAlign: "center", color: "white", fontWeight: "700", marginHorizontal: 2, padding: 5, fontSize: metrices(1.5), }}>New</Text> : null}

                            {itemValue.isPopular ? <Text style={{ backgroundColor: "#2196F3", borderRadius: 10, textAlign: "center", color: "white", fontSize: metrices(1.5), fontWeight: "700", marginHorizontal: 2, padding: 5 }}  >Popular</Text> : null}
                        </View>

                        <View style={styles.bottomViewContainer}>
                            <Text>{itemValue.description}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", width: "30%", alignItems: "center" }}>
                        <Pressable style={{ alignContent: "center", justifyContent: "center", borderWidth: 1, width: "45%", height: metrices(3), borderColor: "grey" }}>
                            <Text style={{ textAlign: 'center' }}>-</Text>
                        </Pressable>
                        <Pressable style={{ alignContent: "center", justifyContent: "center", borderWidth: 1, width: "45%", height: metrices(3), borderColor: "grey" }}>
                            <Text style={{ textAlign: 'center' }}>+</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            {/* 
            <TouchableOpacity style={styles.BottomFloatButton}>
                <SimpleLineIcons name="list" size={15} color="white" />
                <Text style={{ color: "white", fontWeight: "800", fontSize: metrices(2) }}> Menu</Text>
            </TouchableOpacity> */}



        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    centerViewContainer: {
        width: '100%',
        height: metrices(82),
        backgroundColor: '#FFFF',
        // marginHorizontal: metrices(2)
    },
    bottomButtomViewStyle: {
        width: '100%',
        height: metrices(8),
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: metrices(4)
    },
    bottomButtonTouchContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageViewContainer: {
        width: '94%',
        // height: metrices(2),
        // borderWidth: 1,
        // borderRadius: 8,
        paddingVertical: '4%',
        // alignSelf: 'center',
        // alignItems: 'center',
        marginTop: 12,
        flexDirection: 'row',

    },
    valueTextStyle: {
        fontSize: 18,
        color: 'black',
        marginBottom: 12,
    },
    hotelNameContainer: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        marginTop: 12,
        gap: 10,
    },
    addOrderViewContainerStyle: {
        width: '44%',
        height: '82%',
        borderWidth: 1,
        borderRadius: 8,
    },
    buttonStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartIconContainer: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartIconTouchableStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomViewContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    subBottomViewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textInputStyle: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        alignItems: 'center',
        borderColor: "grey",
        borderWidth: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginVertical: 10,

        // Elevation for Android
        elevation: 4,
    },
    BottomFloatButton: {
        width: "30%",
        backgroundColor: '#5D8ED5',
        borderRadius: 20,
        color: "white",
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        position: 'absolute',
        bottom: metrices(13), // Adjust the distance from the bottom
        right: metrices(18), // Adjust the distance from the right
        alignItems: 'center',
        zIndex: 1, // Ensure the button stays on top


    }
});
export default ItemDetailPage;
