import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { GetRunningOrderServiceHandler } from '../../store/services/getRunningOderService';
import OverlayLoader from '../../components/OverlayLoader';
import TopBarComponent from '../../components/TopBarComponent';
import ZigzagLines from 'react-native-zigzag-lines';
import { CancelOrderServiceHandler } from '../../store/services/CancelOrderService';

let deviceWidth = Dimensions.get('window').width;

const RunningOrders = ({ res }: any) => {
    const dispatch = useDispatch();
    const [getOrder, setGetOrder] = useState<any[]>([]);
    const [totalOrder, setTotal] = useState(0);
    const [loader, setLoader] = useState(true);

    useEffect(() => {


        fetchRunningOrders();
    }, [dispatch, res]);
    const fetchRunningOrders = async () => {
        const result = await dispatch(GetRunningOrderServiceHandler(res));
        if (GetRunningOrderServiceHandler.fulfilled.match(result)) {
            setTotal(result.payload.data.total);
            setGetOrder(result.payload.data.data); // Assuming your orders are in `result.payload.data.data`
        } else {
            console.error('Error fetching running orders:', result.error);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    function calculateTotalYears(data: any) {
        // Parse the created_at date to get the year
        const createdAtYear = new Date(data.created_at).getFullYear();

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Calculate the total number of years
        const totalYears = currentYear - createdAtYear;

        return totalYears;
    }
    const handleCancel = (data: any) => {
        Alert.alert(
            "Cancel Order",
            "Are you sure you want to cancel this order?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: async () => {
                        const result = await dispatch(CancelOrderServiceHandler(data));
                        if (CancelOrderServiceHandler.fulfilled.match(result)) {
                            setTotal(result.payload.data.total);
                            setGetOrder(result.payload.data.data);
                        } else {
                            console.error('Error fetching running orders:', result.error);
                        }
                        fetchRunningOrders();
                    }
                }
            ]
        );
    }
    const renderItem = ({ item }: { item: any }) => (
        <>
            <View style={styles.orderContainer}>
                <View style={styles.itemrow}>
                    {item.orderstatus_id === 6 && <View style={styles.orderstatus}>
                        <Text style={{ color: 'red', fontSize: 16 }}>Cancelled</Text>
                    </View>
                    }
                    {item.orderstatus_id === 5 && <View style={styles.orderstatus}>
                        <Text style={{ color: 'black', fontSize: 16 }}>Delivered</Text>
                    </View>
                    }
                </View>
                <View style={styles.itemrow}>
                    <View>
                        <Text style={styles.uniqueorderText}>{item.unique_order_id}</Text>
                        <Text style={styles.orderText}>{item.restaurant.name}</Text>
                    </View>
                    <Text>{calculateTotalYears(item)} years</Text>
                </View>
                {item.orderitems.map((orderItem: any, index: number) => (
                    <View key={index} style={styles.orderitemrow}>
                        <Text style={styles.orderText}>{orderItem.quantity}x</Text>
                        <Text style={styles.itemname}>{orderItem.name}</Text>
                        <Text style={styles.itemprice}>${(orderItem.quantity * orderItem.price).toFixed(2)}</Text>
                    </View>
                ))}
                <View style={styles.itemrow}>
                    <Text style={styles.orderText}>Delivery Charges:</Text>
                    <Text style={styles.orderText}>${item.delivery_charge}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.orderText}>Tax:</Text>
                    <Text style={styles.orderText}>
                        ${item.tax}% (+${((item.tax) / (item.tax_amount)).toFixed(2)})
                    </Text>

                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.orderText}>Total:</Text>
                    <Text style={styles.orderText}>${item.total}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.orderText}>Payment Mode:</Text>
                    <Text style={styles.orderText}>{item.payment_mode}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.addressText}> {item.address}</Text>
                </View>
                {item.orderstatus_id === 1 && (
                    <TouchableOpacity style={styles.cancel} onPress={() => handleCancel(item)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                )}
            </View>
            <ZigzagLines
                width={deviceWidth}
                backgroundColor="#FFF"
                color="#DEDEDE"
                style={{ marginBottom: 20 }}
            />
        </>
    );

    return (
        <>
            {loader ? <OverlayLoader /> : (
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView>
                        <TopBarComponent homeIcon={true} backIcon={true} />
                        <View style={styles.container}>
                            {totalOrder > 0 ? (
                                <FlatList
                                    data={getOrder}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            ) : (
                                <Text style={styles.noOrderText}>No running orders available.</Text>
                            )}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 16,
        backgroundColor: '#f1f1f1',
    },
    itemrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    orderitemrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    orderContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    orderText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
        fontWeight: '500',
    },
    addressText: {
        fontSize: 12,
        color: 'black',
    },
    cancel: {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 10,
    },
    cancelText: {
        fontSize: 17,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemname: {
        flex: 1,
        marginStart: 20,
        color: 'black',
        fontWeight: '500',
    },
    itemprice: {
        textAlign: 'right',
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    uniqueorderText: {
        fontSize: 15,
        color: 'orange',
        marginBottom: 4,
    },
    noOrderText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    orderstatus: {
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
    },
});

export default RunningOrders;
