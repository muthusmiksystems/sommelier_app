import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import hotelImage from '../../assets/images/logobg.png';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { metrices } from '../../assets/metrices';
export function RestaurantInfoPalatte({ Details }) {
    return (
        <View style={styles.imageViewContainer}>
            <Image
                source={hotelImage}
                resizeMode="contain"
                style={{ width: '27%', height: metrices(10), borderRadius: 8 }}
            />
            <View style={{ flexDirection: "column", marginHorizontal: 2, width: "70%" }}>
                <Text style={{ marginHorizontal: 2, fontWeight: "900", color: "black", fontSize: metrices(2) }}> {Details.hotelName}</Text>
                <Text style={{ margin: 2, color: "black", fontSize: metrices(1.5) }}> {Details.hotelName}</Text>


                <View style={styles.bottomViewContainer}>
                    <View style={styles.subBottomViewContainer}>
                        <FontAwesome name={'star'} size={18} color={'orange'} />
                        <Text style={{ color: 'grey' }}> {Details.ratings}</Text>
                    </View>
                    <View style={styles.subBottomViewContainer}>
                        <SimpleLineIcons
                            name={'location-pin'}
                            size={18}
                            color={'grey'}
                        />
                        <Text style={{ color: 'grey' }}> {Details.time}</Text>
                    </View>
                    <View style={styles.subBottomViewContainer}>
                        <SimpleLineIcons name={'wallet'} size={18} color={'grey'} />
                        <Text style={{ color: 'grey' }}> ${Details.ruppees} FOR TWO</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageViewContainer: {
        width: '94%',
        paddingVertical: '4%',
        marginTop: 12,
        flexDirection: 'row',
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
})