import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deviceInfo, logindeviceInfo, registerUrl, restaurantUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const logindeviceInfoServiceHandler = createAsyncThunk(
    'post/logindeviceInfoService',
    async (data: any, thunkAPI) => {
        
        const headers = {
            'Content-Type': 'application/json'
        };
        // try {
            // const payload = {
            //     "push_token":data.push_token,
            //     "id":data.id
            // }
        return await axios.post(logindeviceInfo, data, { headers: headers }).then(response => {
            return response;
        })
            .catch(error => {
                console.log("Inside catch of device...............", error);
            })
        // } catch (error) {
        //     console.log("error catch of login...............", error);
        //     throw error;
        // }
    }
);
export const logindeviceInfoServiceSlice = createSlice({
    name: 'logindeviceInfoService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(logindeviceInfoServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(logindeviceInfoServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default logindeviceInfoServiceSlice.reducer;