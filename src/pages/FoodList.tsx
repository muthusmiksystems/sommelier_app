import HorizontalCardSlider from '../components/HorizontalCardSlider';
import { url } from '../assets/constantsDummy';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../store/services/AddProductService';
const FoodList = ({ items, recommend,products }:any): React.JSX.Element => {

    const [quantity, setQuantity] = useState({});
    const [expandedItems, setExpandedItems] = useState({});
    const [openCategories, setOpenCategories] = useState({});
    const dispatch = useDispatch();
    
    const toggleCategory = (categoryName) => {
        setOpenCategories(prevOpenCategories => ({
            ...prevOpenCategories,
            [categoryName]: !prevOpenCategories[categoryName]
        }));
    };
    const handleIncrement = (item) => {
        dispatch(addProduct({ ...item, quantity: 1 }));
    };

    const handleDecrement = (id: any) => {
        dispatch(removeProduct({ id }));
    };
    const toggleDescription = (id: any) => {
        setExpandedItems(prevExpandedItems => ({
            ...prevExpandedItems,
            [id]: !prevExpandedItems[id]
        }));
    };

    const renderCategory = (categoryName, items) => {
        const isOpen = openCategories[categoryName] !== undefined ? openCategories[categoryName] : true; // Check if the category is open
        return (
            <View style={styles.categoryContainer}>
                <TouchableOpacity onPress={() => toggleCategory(categoryName)} style={styles.catogerystyle}>
                    <Text style={styles.categoryTitle}>{categoryName}</Text>
                    <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color="black" />
                </TouchableOpacity>
                {isOpen && (
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>
        );
    };


    const renderItem = ({ item }:any) => {
        const isExpanded = expandedItems[item.id] || false;

        // Find the matching product in the Redux store by name
        const productInStore = Object.values(products).find(product => product.name === item.name);

        return (
            <View style={styles.itemContainer}>
                {productInStore && productInStore.quantity > 0 && (
                    <Text style={styles.quantityText}>{productInStore.quantity}</Text>
                )}
                <Image
                    source={{ uri: url + item.image }}
                    style={styles.itemImage}
                    resizeMode="cover"
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item?.name}</Text>
                    <View style={styles.badgerow}>
                        {item.is_recommended === 1 && (
                            <View>
                                <Text style={[styles.badge, { backgroundColor: '#D53D4C' }]}>Recommended</Text>
                            </View>
                        )}
                        {item.is_popular === 1 && (
                            <View>
                                <Text style={[styles.badge, { backgroundColor: '#FF5722' }]}>Popular</Text>
                            </View>
                        )}
                        {item.is_new === 1 && (
                            <View>
                                <Text style={[styles.badge, { backgroundColor: '#2196F3' }]}>New</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.itemPrice}>${item?.price}</Text>
                    <Text style={styles.desc}>
                        {isExpanded ? item?.desc.replace(/<\/?p>|<br\s*\/?>|&nbsp;/g, '') : item?.desc.substring(0, 30).replace(/<\/?p>|<br\s*\/?>|&nbsp;/g, '')}
                        {item?.desc?.length > 30 && (
                            <Text onPress={() => toggleDescription(item.id)} style={{ color: '#b3b7bd' }}>
                                {isExpanded ? ' Show Less' : ' Show More'}
                            </Text>
                        )}
                    </Text>
                </View>
                <View style={styles.itemCounter}>
                    {/* Decrement Button */}
                    <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.cartNumber}>
                        <Text style={styles.signs}>-</Text>
                    </TouchableOpacity>
                    {/* Increment Button */}
                    <TouchableOpacity onPress={() => handleIncrement(item)} style={styles.cartNumber}>
                        <Text style={styles.signs}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View>
            <View style={styles.foodcontainer}>
                <Text style={styles.textrecommend}>RECOMMENDED</Text>
                <HorizontalCardSlider data={recommend} handleDecrement={handleDecrement} handleIncrement={handleIncrement} products={products}/>
            </View>
            <View style={styles.catogerybottom}>
                {Object.keys(items).map((categoryName) => (
                    <View key={categoryName}>
                        {renderCategory(categoryName, items[categoryName])}
                    </View>

                ))}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    foodcontainer: {
        marginHorizontal: 18,
    },
    catogerybottom: {
        marginBottom: '15%'
    },
    textrecommend: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
    },
    categoryContainer: {
        marginVertical: 20,
        marginEnd: 10,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        marginLeft: 20,
        color: 'black',
        flexWrap: 'wrap',
    },
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 30,
        borderTopColor: '#b3b7bd',
        borderWidth: 1,
        borderStartColor: 'white',
        borderEndColor: 'white',
        borderBottomColor: 'white',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    itemDetails: {
        marginLeft: 10,
        width: 180
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    itemPrice: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 3,
    },
    itemCounter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartNumber: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#b3b7bd',
        borderWidth: 0.2,
        paddingHorizontal: 13,
    },
    signs: {
        color: 'black',
        fontSize: 20,
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
    badgerow: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        marginVertical: 5,
    },
    badge: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginHorizontal: 1,
        borderRadius: 5,
        color: 'white',
        fontSize: 10,
    },
    desc: {
        color: 'gray',
        fontSize: 14,
    },
    catogerystyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default FoodList;
