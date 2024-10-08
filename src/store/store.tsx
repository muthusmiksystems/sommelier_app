import { configureStore } from "@reduxjs/toolkit";
import loginServiceReducer from './services/loginService';
import registerServiceReducer from "./services/registerService";
import deliveryServiceReducer from "./services/DeliveryServices";
import foodDetailsServiceReducer from "./services/FoodDetailsServices";
import getRestaurentDetailsServiceReducer from "./services/GetRestaurentDetailsService";
import getRestaurentServiceReducer from "./services/RestaurentService";
import logindetails from './services/loginService'
import saveAddressServiceReducer from './services/SaveAddressService'
import getAddressServiceReducer from './services/getAddressService'
import updateProfileServiceReducer from './services/UpdateProfileService'
import deviceInfoServiceReducer from './services/DeviceInfoService'
import logindeviceInfoServiceReducer from './services/SaveLoginDeviceInfoService'
import fingerprintServiceReducer from "./services/FingerprintService";
import getuserServiceReducer from "./services/GetUserServices";
import AddProductService from './services/AddProductService';
import CheckAvailabilityServiceReducer from './services/CheckAvailabilityItemService'
import operationStatusServiceReducer from './services/gwtOperationStatusService'
import couponServiceReducer from './services/CouponService'
import placeOrderServiceReducer from './services/PlaceOrderService'
import CheckRunningOrderServiceReducer from './services/CheckRunningOderService'
import GetRunningOrderServiceReducer from './services/getRunningOderService'
import GetRestaurantVenueServiceReducer from './services/GetRestaurantVenueService'
import CheckMaxPaxServiceReducer from './services/CheckMaxPaxService'
import GetShiftTimingExtServiceReducer from './services/GetShiftTimingExtService'
import GetRestaurantSettingServiceReducer from './services/GetRestaurantSettingService'
import CancelOrderServiceReducer from './services/CancelOrderService'
const store = configureStore({
    reducer: {
        loginserviceData: loginServiceReducer,
        registerServiceData: registerServiceReducer,
        deliveryServiceData: deliveryServiceReducer,
        foodDetailsServiceData: foodDetailsServiceReducer,
        getRestaurentDetailsServiceData: getRestaurentDetailsServiceReducer,
        getRestaurentServiceData: getRestaurentServiceReducer,
        logindetailsdata: logindetails,
        saveAddressServicedata: saveAddressServiceReducer,
        getAddressServicedata: getAddressServiceReducer,
        updateProfileServicedata: updateProfileServiceReducer,
        deviceInfoServicedata: deviceInfoServiceReducer,
        logindeviceInfoServicedata: logindeviceInfoServiceReducer,
        fingerprintServiceData: fingerprintServiceReducer,
        getuserServiceData: getuserServiceReducer,
        AddProductData: AddProductService,
        CheckAvailabilityServiceData: CheckAvailabilityServiceReducer,
        operationStatusServiceData: operationStatusServiceReducer,
        couponServiceData: couponServiceReducer,
        placeOrderServicedata: placeOrderServiceReducer,
        CheckRunningOrderServiceData: CheckRunningOrderServiceReducer,
        GetRunningOrderServiceData: GetRunningOrderServiceReducer,
        GetRestaurantVenueServiceData: GetRestaurantVenueServiceReducer,
        CheckMaxPaxServiceData: CheckMaxPaxServiceReducer,
        GetShiftTimingExtServiceData: GetShiftTimingExtServiceReducer,
        GetRestaurantSettingServiceData: GetRestaurantSettingServiceReducer,
        CancelOrderServiceData: CancelOrderServiceReducer,

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })

})
export default store;
