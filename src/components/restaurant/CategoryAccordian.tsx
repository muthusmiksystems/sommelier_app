import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager, Image, Pressable } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import hotelImage from '../../assets/images/logobg.png';
import { ItemMockCategories } from '../../assets/MockJson/ItemMock';

import { metrices } from '../../assets/metrices';

const ItemMock = ItemMockCategories;
export default function CategoryAccordian({ ItemView }) {
    const navigation = useNavigation();
    const [expanded, setExpanded] = useState({});
    const categories = Object.keys(ItemMock);


    useEffect(() => {
        // Enable layout animation
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }, []);

    const toggleExpand = (category) => {
        // Use LayoutAnimation to animate the opening and closing of accordion items
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
    };
    const renderArrowIcon = (category) => (
        <SimpleLineIcons
            name={expanded[category] ? 'arrow-up' : 'arrow-down'}
            size={10}
            color={'grey'}
        />
    );
    return (
        <View>
            {categories.map((category) => (
                <View key={category}>
                    {/* Header */}
                    <TouchableOpacity style={{ flexDirection: "row", padding: 20, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: "#f2f2f2" }} onPress={() => toggleExpand(category)}>
                        <Text style={{ fontWeight: '700', marginHorizontal: 20, marginVertical: 0 }}>{category.toLocaleUpperCase()}</Text>
                        {renderArrowIcon(category)}
                    </TouchableOpacity>

                    {/* Content */}
                    {expanded[category] && (
                        <View style={styles.categoryContent}>
                            {ItemMock[category].map((item, index) => (
                                <View key={item.dishName} style={{ flexDirection: "row", width: "100%", padding: 2, borderBottomWidth: index != ItemMock[category].length - 1 ? 1 : 0, borderColor: "#f2f2f2" }}>
                                    <Pressable style={{ height: metrices(8), width: "20%", marginHorizontal: metrices(0.5) }} onPress={() => ItemView(item)}>
                                        <Image
                                            source={hotelImage}
                                            resizeMode="contain"
                                            style={{ height: "100%", width: "100%", }}
                                        />
                                    </Pressable>
                                    <View style={{ width: "50%" }}>
                                        <Text key={index} style={styles.itemText}>{item.dishName}</Text>
                                        <Text key={index} >${item.price}</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            {item.isRecommended ? <Text style={{ backgroundColor: "#D53D4C", borderRadius: 10, textAlign: "center", color: "white", fontWeight: "700", marginHorizontal: 2, padding: 5, fontSize: metrices(1.5), }} key={index} >Recommended</Text> : null}
                                            {item.isNew ? <Text style={{ backgroundColor: "#FF5722", borderRadius: 10, textAlign: "center", color: "white", fontWeight: "700", marginHorizontal: 2, padding: 5, fontSize: metrices(1.5), }} key={index} >New</Text> : null}

                                            {item.isPopular ? <Text style={{ backgroundColor: "#2196F3", borderRadius: 10, textAlign: "center", color: "white", fontSize: metrices(1.5), fontWeight: "700", marginHorizontal: 2, padding: 5 }} key={index} >Popular</Text> : null}
                                        </View>
                                        <Text key={index}>{item.description}</Text>
                                        {/* <Text key={index} style={styles.itemText}>{item.isVegetarian}</Text> */}
                                    </View>
                                    <View style={{ width: "20%", flexDirection: "row" }}>
                                        <Pressable style={{ alignContent: "center", justifyContent: "center", borderWidth: 1, width: "45%", height: metrices(3), borderColor: "grey" }}>
                                            <Text style={{ textAlign: 'center' }}>-</Text>
                                        </Pressable>
                                        <Pressable style={{ alignContent: "center", justifyContent: "center", borderWidth: 1, width: "45%", height: metrices(3), borderColor: "grey" }}>
                                            <Text style={{ textAlign: 'center' }}>+</Text>
                                        </Pressable>
                                    </View>
                                </View>

                            ))}
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    categoryContent: {
        marginHorizontal: 20,
        width: "100%",


    },
    itemText: {
        marginLeft: 2,
        marginBottom: 0,
        fontWeight: "700"
    },
});
