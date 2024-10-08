// export const baseUrl = "https://devtest.sommelier.cloud/index.php/api/";
// export const baseUrl = "https://Tuyentest.azurewebsites.net/public/api/";
// export const baseUrl = "https://somauseast.sommelier.cloud/public/api/";
// export const baseUrl = "http://192.168.1.38/public/api/";
// export const baseUrl = "http://192.168.1.37/public/api/";
export const baseUrl = "https://somauseast.sommelier.cloud/public/api/";
// export const baseUrl = "https://somauseast.azurewebsites.net/public/api/";
// export const baseUrl= "https://sommelier0324.azurewebsites.net/public/api/";
export const loginUrl = baseUrl + "login";
export const registerUrl = baseUrl + "register";
export const restaurantUrl = baseUrl + "get-delivery-restaurants";
export const restaurantfooddetailsUrl = baseUrl + "get-restaurant-items";
export const getRestaurentDetailsUrl = baseUrl + "get-restaurant-info";
export const getRestaurent = baseUrl + "get-restaurant-info-by-id/{id}";
export const saveAddress = baseUrl + "save-address";
export const getAddress = baseUrl + "get-addresses";
export const updateProfile = baseUrl + "update-user-profile";
export const getSlide = baseUrl + "promo-slider-new";
export const deviceInfo = baseUrl + "save-notification-token-no-user"
export const logindeviceInfo = baseUrl + "save-notification-token"
export const otpUrl = baseUrl + 'login-otp'
export const registerotpUrl = baseUrl + 'register-otp'
export const updateFingerprint = baseUrl + 'user/fingerprint'
export const getuserurl = baseUrl + 'get-by-userId'
export const CheckAvailabilityService = baseUrl + 'check-cart-items-availability'
export const getRestaurantInfoAndOperationalStatus = baseUrl + 'get-restaurant-info-and-operational-status'
export const coupon = baseUrl + 'apply-coupon-app'
export const STRIPE_PAYMENT = baseUrl + 'accept-stripe-payment-app'
export const placeorder = baseUrl + 'place-order-app'
export const CheckRunningOrder = baseUrl + 'check-running-order'
export const GetRunningOrder = baseUrl + 'get-orders'
export const GetRestaurantVenue = (RestaurentId:any) => `${baseUrl}restaurant-venue/${RestaurentId}`;
export const GetShiftTimingExt = (data:any) => `${baseUrl}store/shift-timing-ext/${data.restaurant}/${data.date}`;
export const CheckMaxPax = baseUrl + 'check-max-pax'
export const GetRestaurantSetting = (id:any) => `${baseUrl}restaurantbook/settings/${id}`;
export const STRIPE_TABLE_BOOK = (id:any) => `${baseUrl}new-booking/${id}`;
export const CancelOrder = baseUrl + 'cancel-order'




