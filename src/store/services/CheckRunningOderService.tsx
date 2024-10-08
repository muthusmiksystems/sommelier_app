import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckRunningOrder } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const CheckRunningOrderServiceHandler = createAsyncThunk(
    'post/CheckRunningOrderService',
    async (data: any, thunkAPI) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const tokenString = await AsyncStorage.getItem('UserToken');
            const slug = tokenString ? JSON.parse(tokenString) : {};
console.log('slug--',slug)
            const payload = {
                token: slug?.auth_token,
                user_id: slug?.id
            };
            console.log('payload',payload)
            return await axios.post(CheckRunningOrder, payload, { headers: headers })
                .then(response => {
                    console.log('oooo---')
                    return response;
                })
                .catch(error => {
                    console.log("Inside CheckRunningOrder of device...............", error);
                    return thunkAPI.rejectWithValue(error.response.data);
                });
        } catch (error: any) {
            console.log("Error in CheckRunningOrderServiceHandler:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const CheckRunningOrderServiceSlice = createSlice({
    name: 'CheckRunningOrderService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CheckRunningOrderServiceHandler.pending, (state: any) => {
            state.data = null;
            state.loading = true;
        });
        builder.addCase(CheckRunningOrderServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(CheckRunningOrderServiceHandler.rejected, (state: any, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload || "Failed to check running order.";
        });
    },
});

export default CheckRunningOrderServiceSlice.reducer;