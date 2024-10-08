import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import { HamburgerMenuDropdownList } from '../assets/constantsDummy';
const NotificationScreen = ({ isVisible, onClose }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.announcementStyle}>
                    {/* <View style={styles.header}>
                        <Text style={styles.titleStyle}>Course Announcements</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Entypo name="squared-cross" color="#eb2640" size={25} />
                        </TouchableOpacity>
                    </View> */}
                    <ScrollView>
                        {HamburgerMenuDropdownList?.map((item, index) => (
                            <TouchableOpacity key={item.id} style={styles.touchableStyle}>
                                <Text style={{ color: 'black', fontSize: 18 }}>{item.list}</Text>
                                {/* <Text style={{ color: 'black', ...FONTS.robotoregular }}>{moment(item.activationDate).format("DD/MM/YYYY hh:mm A")}</Text> */}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                {/* {innerModalShow &&
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={innerModalShow}
                            onRequestClose={() => {
                                setInnerModalShow(false)
                            }}
                        >
                            <View style={styles.centeredView}>
                                <TouchableOpacity onPress={() => setInnerModalShow(false)} style={{ marginLeft: metrices(40) }}>
                                    <Entypo name="squared-cross" color="#eb2640" size={25} />
                                </TouchableOpacity>
                                <View style={styles.modalView}>
                                    <Text style={[styles.modalText, { fontSize: 18, ...FONTS.h2 }]}>{modalValue?.name}</Text>
                                    <Text style={styles.modalText}>{modalValue.description}</Text>
                                </View>

                            </View>
                        </Modal>
                    </View>
                } */}
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // alignSelf: 'baseline',
        width: '50%',
        height: 200,
        position: 'absolute',
        zIndex: 1,
        marginLeft: 100,
        marginTop: 60,
    },
    announcementStyle: {
        height: "96%",
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        padding: 10,
        borderWidth: 0.6
    },
    touchableStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 6,
        padding: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal: 10
    },
    titleStyle: {
        color: 'black',
        fontSize: 20,
        textAlign: "center",
        marginBottom: 12
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
        color: 'black'
    }
})

export default NotificationScreen;