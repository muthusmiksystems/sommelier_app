import React, { useEffect, useState } from "react";
import {
    Button,
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Dimensions,
    Platform,
    ImageBackground,
    Modal
} from "react-native";
import OverlayLoader from "../components/OverlayLoader";
import TopBarComponent from "../components/TopBarComponent";
import { useDispatch, useSelector } from "react-redux";
import { GetRestaurantVenueServiceHandler } from "../store/services/GetRestaurantVenueService";
import { CheckMaxPaxServiceHandler } from "../store/services/CheckMaxPaxService";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { GetShiftTimingExtServiceHandler } from "../store/services/GetShiftTimingExtService";
import { WebView } from "react-native-webview";
import { GetRestaurantSettingServiceHandler } from "../store/services/GetRestaurantSettingService";
import { CardField, createPaymentMethod } from "@stripe/stripe-react-native";
import Axios from "axios";
import { STRIPE_PAYMENT, STRIPE_TABLE_BOOK } from "../store/constant";
import { restaurentId as restaurentId, restaurentSlug as restaurentSlug } from "../../app.json";
import Loader from '../components/Loader'
import background from '../assets/images/back6.jpg'
import HeaderComponent from "../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/compat';
const Booking = () => {
    const [loader, setLoader] = useState(true);
    const [responseLoader, setResponseLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerdob, setDatePickerdob] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dob, setDob] = useState(new Date());
    const [shiftTimingHtml, setShiftTimingHtml] = useState("");
    const [selectedTiming, setSelectedTiming] = useState(null);
    const [errors, setErrors] = useState({});
    const res = useSelector((state) => state.logindetailsdata.data);
    // console.log('res--',res)
    const [showTime, setShowTime] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [show, setShow] = useState(true)
    const dispatch = useDispatch();
    const [restaurantSetting, setRestaurantSetting] = useState();
    const [restaurant, setRestaurant] = useState();
    const [cardDetails, setCardDetails] = useState(null);
    let deviceWidth = Dimensions.get("window").width;
    const navigation = useNavigation();
    const initialFormState = {
        select_venue: restaurentId,
        no_of_seats: "",
        booking_date: "",
        booking_time: "",
        table_location: "",
        mobile_number: "",
        email_address: "",
        first_name: "",
        last_name: "",
        dob: "",
        comment: "",
        terms_conditions: true,
        stripeToken: "",
    };
    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);

        loadInitialData();
        handleselect_venue();
    }, []);

    const loadInitialData = async () => {
        setResponseLoader(true);
        try {
            const originalPromiseResult = await dispatch(GetRestaurantVenueServiceHandler(res));
            setRestaurants(originalPromiseResult.payload.data);
        } finally {
            setResponseLoader(false);
        }
    };

    const handleChange = (name, value) => {
        if (name === "no_of_seats") {
            handle_no_of_seats(value);
        }
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: null }); // clear the error for the current field
    };

    const handleselect_venue = async () => {
        setResponseLoader(true);
        try {
            const originalPromiseResult = await dispatch(GetRestaurantSettingServiceHandler(restaurentId));
            setRestaurant(originalPromiseResult.payload);
        } finally {
            setResponseLoader(false);
        }
    };

    const handle_no_of_seats = async (pax) => {
        const payload = {
            restaurant_id: form?.select_venue,
            no_of_pax: pax,
        };
        setResponseLoader(true);
        try {
            const originalPromiseResult = await dispatch(CheckMaxPaxServiceHandler(payload));
            console.log(originalPromiseResult.payload.data);
        } finally {
            setResponseLoader(false);
        }
    };

    const handleCheckbox = () => {
        setForm({ ...form, terms_conditions: !form.terms_conditions });
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const showDateOfBirth = () => {
        setDatePickerdob(true);
    };

    const handleConfirm = async (date) => {
        setForm({ ...form, booking_date: moment(date).format("YYYY-MM-DD") });
        setDatePickerVisibility(false);
        setDate(date);
        loadShiftTimings(form.select_venue, moment(date).format("YYYY-MM-DD"));
    };

    const handleConfirmdob = (date) => {
        setForm({ ...form, dob: moment(date).format("YYYY-MM-DD") });
        setDatePickerVisibility(false);
        setDob(date);
    };

    const loadShiftTimings = async (restaurant, date) => {
        const payload = { restaurant: restaurentId, date: date };
        setResponseLoader(true);
        try {
            const originalPromiseResult = await dispatch(GetShiftTimingExtServiceHandler(payload));
            const htmlString = originalPromiseResult.payload.html;
            setShiftTimingHtml(htmlString);
            setShowTime(true);
        } finally {
            setResponseLoader(false);
        }
    };

    const handleConfirmPayment = async (stripeTokenId) => {
        // Log form data for debugging
        console.log(
            "no_of_seats:", form.no_of_seats,
            "booking_date:", form.booking_date,
            "area_id:", form.table_location,
            "mobile_number:", form.mobile_number ? form.mobile_number : res.phone,
            "email_address:", form.email_address ? form.email_address : res.email,
            "first_name:", form.first_name ? form.first_name : res.first_name,
            "last_name:", form.last_name ? form.last_name : res.last_name,
            "dob:", form.dob ? form.dob : res.dob,
            "comment:", form.comment,
            "stripeToken:", form.stripeToken ? form.stripeToken : stripeTokenId,
            "booking_time:", form.booking_time,
            "app:", true
        );

        setResponseLoader(true);

        try {
            const response = await Axios.post(STRIPE_TABLE_BOOK(restaurentId), {
                no_of_seats: form.no_of_seats,
                booking_date: form.booking_date,
                area_id: form.table_location,
                mobile_number: form.mobile_number ? form.mobile_number : res.phone,
                email_address: form.email_address ? form.email_address : res.email,
                first_name: form.first_name ? form.first_name : res.first_name,
                last_name: form.last_name ? form.last_name : res.last_name,
                dob: form.dob ? form.dob : res.dob,
                comment: form.comment,
                stripeToken: form.stripeToken ? form.stripeToken : stripeTokenId,
                booking_time: form.booking_time,
                app: true
            });

            console.log("Response:", response.data);

            if (response.data.success) {
                // Show the success modal with the message
                setModalMessage(response.data.message || "Booking successful!");
                setModalVisible(true);
                setShowPayment(false);
                setShow(true)
                setForm(initialFormState);
                // Optionally, reset the form or perform other actions here

                // Navigate to 'HomeDrawerPage' after 2 seconds
                setTimeout(() => {
                    setModalVisible(false); // Close the modal before navigating
                    navigation.navigate('HomeDrawerPage');
                }, 2000);
            } else {
                // Handle cases where booking was not successful
                Alert.alert("Booking Failed", response.data.message || "Unable to save booking. Please try again.");
            }
        } catch (error) {
            // Handle network or server errors
            Alert.alert("Error", error.response?.data?.message || error.message || "An unexpected error occurred.");
            console.error("Confirm Payment Error:", error);
        } finally {
            setResponseLoader(false);
        }
    };


    const handlePayment = () => {
        const newErrors = {};

        if (!form.no_of_seats) newErrors.no_of_seats = "Number of seats is required";
        if (!form.booking_date) newErrors.booking_date = "booking_date is required";
        if (!form.mobile_number && !res.phone) newErrors.mobile_number = "Mobile number is required";
        if (!form.email_address && !res.email) newErrors.email_address = "Email address is required";
        if (!form.first_name && !res.first_name) newErrors.first_name = "First name is required";
        if (!form.last_name && !res.last_name) newErrors.last_name = "Last name is required";
        if (!form.terms_conditions) newErrors.terms_conditions = "You must agree to the terms and conditions";
        if (!form.booking_time) newErrors.booking_time = "Please choose a booking time first";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (form.no_of_seats >= restaurant.restaurant_settings.deposit_covers) {
            setShow(false)
            setShowPayment(true);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setResponseLoader(true)
        const newErrors = {};
        if (!form.no_of_seats) newErrors.no_of_seats = "Number of seats is required";
        if (!form.mobile_number && !res.phone) newErrors.mobile_number = "Mobile number is required";
        if (!form.email_address && !res.email) newErrors.email_address = "Email address is required";
        if (!form.first_name && !res.first_name) newErrors.first_name = "First name is required";
        if (!form.last_name && !res.last_name) newErrors.last_name = "Last name is required";
        if (!form.terms_conditions) newErrors.terms_conditions = "You must agree to the terms and conditions";
        if (!form.booking_date) newErrors.booking_date = "Please choose booking date first";
        if (!form.booking_time) newErrors.booking_time = "Please choose a booking time first";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            if (form.no_of_seats >= restaurant.restaurant_settings.deposit_covers) {
                const { paymentMethod, error: paymentMethodError } =
                    await createPaymentMethod({
                        paymentMethodType: "Card",
                        card: cardDetails,
                    });
                if (paymentMethodError) {
                    Alert.alert("Payment Method Error", paymentMethodError.message);
                    return;
                }
                console.log('paymentMethod-', paymentMethod)
                setForm({ ...form, stripeToken: paymentMethod.id });
                handleConfirmPayment(paymentMethod.id);
            }
            else {
                handleConfirmPayment();
            }
        } catch (error) {
            Alert.alert("An error occurred", error.message);
            setResponseLoader(false)
        }
    };

    const injectJS = `
        (function() {
            var links = document.querySelectorAll('.booking_time_text');
            links.forEach(function(link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    var timing = this.innerText.trim();
                    window.ReactNativeWebView.postMessage(timing);
                });
            });
        })();
        true;
    `;

    const onWebViewMessage = (event) => {
        console.log("Message from WebView:", event.nativeEvent.data);
        handleTimingSelection(event.nativeEvent.data);
    };

    const handleTimingSelection = (timing) => {
        console.log("Selected Timing:", timing);
        setSelectedTiming(timing);
        setForm({ ...form, booking_time: timing });
        setErrors({ ...errors, booking_time: null });
    };
    const handleDrawerNavigation = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };
    const handleRouteNavigation = (routeName: string) => {
        if (routeName === 'goback') {
            navigation.goBack()
        } else {
            navigation.navigate(routeName);
        }
    };
    return (
        <>
            {loader ? (
                <OverlayLoader />
            ) : (
                <SafeAreaView style={styles.safeArea}>
                    <HeaderComponent
                        onPressHamburger={handleDrawerNavigation}
                        onPressRoute={() => handleRouteNavigation('goback')}
                    />
                    <ImageBackground source={background} resizeMode="cover" style={styles.image}>

                        <ScrollView contentContainerStyle={styles.container}>
                            <View style={styles.formContainer}>
                                <Text style={styles.label}>No. of seats</Text>
                                <TextInput
                                    style={[styles.input, errors.no_of_seats && styles.inputError]}
                                    keyboardType="numeric"
                                    value={form.no_of_seats}
                                    onChangeText={(value) => handleChange("no_of_seats", value)}
                                    placeholder="Enter number of seats"
                                    placeholderTextColor="#888"
                                />
                                {errors.no_of_seats && <Text style={styles.errorText}>{errors.no_of_seats}</Text>}

                                <Text style={styles.label}>Booking Date</Text>
                                <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
                                    <Text style={styles.dateText}>{form.booking_date || "Select Date"}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={isDatePickerVisible}
                                    date={date}
                                    onConfirm={handleConfirm}
                                    onCancel={() => {
                                        setDatePickerVisibility(false);
                                    }}
                                    mode="date"
                                />
                                {errors.booking_date && <Text style={styles.errorText}>{errors.booking_date}</Text>}
                                {showTime && (
                                    <>
                                        <Text style={styles.label}>Available Timings</Text>
                                        <WebView
                                            source={{ html: shiftTimingHtml }}
                                            style={{ height: 200, marginBottom: 20, width: deviceWidth }}
                                            injectedJavaScript={injectJS}
                                            onMessage={onWebViewMessage}
                                        />
                                        {errors.booking_time && <Text style={styles.errorText}>{errors.booking_time}</Text>}
                                    </>
                                )}

                                <Text style={styles.label}>Mobile Number</Text>
                                <TextInput
                                    style={[styles.input, errors.mobile_number && styles.inputError]}
                                    keyboardType="phone-pad"
                                    value={form.mobile_number ? form.mobile_number : res.phone}
                                    onChangeText={(value) => handleChange("mobile_number", value)}
                                    placeholder="Enter mobile number"
                                    placeholderTextColor="#888"
                                />
                                {errors.mobile_number && <Text style={styles.errorText}>{errors.mobile_number}</Text>}

                                <Text style={styles.label}>Email Address</Text>
                                <TextInput
                                    style={[styles.input, errors.email_address && styles.inputError]}
                                    keyboardType="email-address"
                                    value={form.email_address ? form.email_address : res.email}
                                    onChangeText={(value) => handleChange("email_address", value)}
                                    placeholder="Enter email address"
                                    placeholderTextColor="#888"
                                />
                                {errors.email_address && <Text style={styles.errorText}>{errors.email_address}</Text>}

                                <Text style={styles.label}>First Name</Text>
                                <TextInput
                                    style={[styles.input, errors.first_name && styles.inputError]}
                                    value={form.first_name ? form.first_name : res.first_name}
                                    onChangeText={(value) => handleChange("first_name", value)}
                                    placeholder="Enter first name"
                                    placeholderTextColor="#888"
                                />
                                {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}

                                <Text style={styles.label}>Last Name</Text>
                                <TextInput
                                    style={[styles.input, errors.last_name && styles.inputError]}
                                    value={form.last_name ? form.last_name : res.last_name}
                                    onChangeText={(value) => handleChange("last_name", value)}
                                    placeholder="Enter last name"
                                    placeholderTextColor="#888"
                                />
                                {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}

                                <Text style={styles.label}>Date of Birth (Optional)</Text>
                                <TouchableOpacity onPress={showDateOfBirth} style={styles.dateInput}>
                                    <Text style={styles.dateText}>{form.dob ? form.dob : res.dob || "Select Date of Birth"}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={isDatePickerdob}
                                    date={dob}
                                    onConfirm={handleConfirmdob}
                                    onCancel={() => {
                                        setDatePickerdob(false);
                                    }}
                                    mode="date"
                                />

                                <Text style={styles.label}>Comments (Optional)</Text>
                                <TextInput
                                    style={styles.input}
                                    value={form.comment}
                                    onChangeText={(value) => handleChange("comment", value)}
                                    placeholder="Enter comments (Optional)"
                                    placeholderTextColor="#888"
                                />

                                <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckbox}>
                                    <View style={styles.checkbox}>
                                        {form.terms_conditions && <View style={styles.checkboxInner} />}
                                    </View>
                                    <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
                                </TouchableOpacity>
                                {errors.terms_conditions && <Text style={styles.errorText}>{errors.terms_conditions}</Text>}

                                {show && <Button title="Book" onPress={handlePayment} />}
                            </View>
                        </ScrollView>
                    </ImageBackground>

                    {showPayment && (
                        <View style={styles.paymentContainer}>
                            <CardField
                                postalCodeEnabled={false}
                                placeholders={{ number: "4242 4242 4242 4242" }}
                                cardStyle={styles.cardField}
                                style={styles.cardFieldContainer}
                                onCardChange={(cardDetails) => setCardDetails(cardDetails)}
                            />
                            {responseLoader ? <Button title="Loading ..." /> : <Button title="Submit Payment" onPress={handleSubmit} />}
                        </View>
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>{modalMessage}</Text>
                                <Button title="Close" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f0f8ff",
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    formContainer: {
        // backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#ddeeff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        color: "#333",
        fontSize: 16,
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    dateInput: {
        backgroundColor: "#ddeeff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        justifyContent: "center",
    },
    dateText: {
        color: "#333",
        fontSize: 16,
        paddingLeft: 5,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: "#fff",
    },
    checkboxLabel: {
        fontSize: 16,
        color: "#fff",
    },
    paymentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: "#ffffff",
    },
    cardField: {
        backgroundColor: "#ddeeff",
        borderRadius: 8,
        padding: 12,
    },
    cardFieldContainer: {
        height: 50,
        marginBottom: 20,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
    },
});

export default Booking;
