import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deviceInfo, registerUrl, restaurantUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const deviceInfoServiceHandler = createAsyncThunk(
    'post/deviceInfoService',
    async (data: any, thunkAPI) => {
        
        const headers = {
            'Content-Type': 'application/json'
        };
        // try {
            const payload = {
                "push_token":data
            }
        return await axios.post(deviceInfo, payload, { headers: headers }).then(response => {
            return response;
        })
            .catch(error => {
                console.log("Inside deviceinfo of device...............", error);
            })
        // } catch (error) {
        //     console.log("error catch of login...............", error);
        //     throw error;
        // }
    }
);
export const deviceInfoServiceSlice = createSlice({
    name: 'deviceInfoService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(deviceInfoServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(deviceInfoServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default deviceInfoServiceSlice.reducer;