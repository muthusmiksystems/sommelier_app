import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    Pressable
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ItemMock } from "../../assets/MockJson/ItemMock";
import hotelImage from '../../assets/images/logobg.png';
import Veg from '../../assets/images/veg-icon-bg.png';
import NonVeg from '../../assets/images/non-veg-icon-bg.png';
import { metrices } from '../../assets/metrices';

export default function RecommendedFoods({ ItemView }) {
    const navigation = useNavigation();
    const list = ItemMock;


    return (
        <View>
            <Text style={{ fontWeight: "700", marginHorizontal: 20, marginVertical: 3 }}>RECOMMENDED</Text>
            <FlatList
                data={list}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ height: metrices(25), padding: 2 }}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={() => ItemView(item)}
                            style={{ flexDirection: "column", width: "100%" }}>

                            <Image
                                source={hotelImage}
                                resizeMode="contain"
                                style={styles.image}
                            />

                            <View style={{ flexDirection: "row", marginTop: 2 }} >
                                <Image
                                    source={item.isVegetarian ? Veg : NonVeg}
                                    resizeMode="contain"
                                    style={{ height: metrices(2.5), width: metrices(2.5), marginHorizontal: metrices(0.5) }}

                                />
                                <Text style={{ fontWeight: "600", fontSize: metrices(2), marginHorizontal: metrices(1) }}>{item.dishName}</Text>
                            </View>
                            <Text>{item.currency} {item.price}</Text>

                            <View style={{ flexDirection: "row", marginVertical: 2, width: "100%" }}>
                                <Pressable style={{ marginHorizontal: 2, alignContent: "center", justifyContent: "center", borderWidth: 1, width: "45%", borderColor: "grey" }}>
                                    <Text style={{ textAlign: 'center' }}>-</Text>
                                </Pressable>
                                <Pressable style={{ marginHorizontal: 2, alignContent: "center", justifyContent: "center", borderWidth: 1, width: "45%", borderColor: "grey" }}>
                                    <Text style={{ textAlign: 'center' }}>+</Text>
                                </Pressable>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        width: metrices(25),
        paddingVertical: 8,
        backgroundColor: 'white',

        borderRadius: 10,
        marginHorizontal: 10,
        padding: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        // Elevation for Android
        elevation: 4,
    },
    touchStyle: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    hotelNameViewStyle: {
        gap: 10,
        width: '100%',
        height: '58%',
    },
    imageContainer: {
        width: '34%',
        height: 100,
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
    textContainer: {
        width: '60%',
        height: 100,
    },
    image: {
        width: '95%',
        height: metrices(13),
        borderRadius: 10,
        margin: metrices(0.5),
        borderWidth: 2,
    },
});

