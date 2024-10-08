import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DotLoader from '../../components/Loader';

const CouponSection = ({ couponText, setCouponText, handleCoupon, dotLoader, showCoupon, couponData, itemContainerMarginBottom }: any) => {
    return (
        <>
            <View style={{ ...styles.itemcontainer, marginBottom: itemContainerMarginBottom }}>
                {dotLoader ? (
                    <View style={{ ...styles.couponrow, margin: 22 }}>
                        <DotLoader />
                    </View>
                ) : (
                    <View style={styles.couponrow}>
                        <SimpleLineIcons name={'tag'} size={20} color={'black'} />
                        <TextInput
                            style={styles.couponinput}
                            value={couponText}
                            placeholder='C O U P O N'
                            placeholderTextColor='red'
                            onChangeText={(text) => setCouponText(text)}
                        />
                        <TouchableOpacity style={styles.couponbutton} onPress={handleCoupon}>
                            <Text style={styles.couponbuttonText}>APPLY</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
            {showCoupon === false && dotLoader === false && (
                <View style={{ ...styles.couponsuccess, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, backgroundColor: 'red', }}>
                    <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', }}>!Invalid Coupon</Text>
                </View>
            )}
            {showCoupon === true && dotLoader === false && (
                <View style={{ ...styles.couponsuccess, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, backgroundColor: 'green', }}>
                    <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', }}>"{couponData?.code}"  Coupon Applied {couponData?.discount_type === 'AMOUNT' ? `$${couponData?.discount} OFF` : `${couponData?.discount}%`}</Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    itemcontainer: {
        alignSelf: 'center',
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 12,
    },
    couponrow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        justifyContent: 'space-between',
    },
    couponinput: {
        color: 'red',
    },
    couponbutton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    couponbuttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    couponsuccess: {
        textAlign: 'center',
        padding: 10,
        marginTop: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginBottom: 20,
    }
});

export default CouponSection;