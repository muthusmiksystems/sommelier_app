import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CancelOrder, CheckRunningOrder } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const CancelOrderServiceHandler = createAsyncThunk(
    'post/CancelOrderService',
    async (data: any, thunkAPI) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const tokenString = await AsyncStorage.getItem('UserToken');
            const slug = tokenString ? JSON.parse(tokenString) : {};
            console.log('slug--', slug)
            const payload = {
                token: slug?.auth_token,
                user_id: slug?.id,
                order_id: data?.id
            };
            console.log('payload', payload)
            return await axios.post(CancelOrder, payload, { headers: headers })
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

export const CancelOrderServiceSlice = createSlice({
    name: 'CancelOrderService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CancelOrderServiceHandler.pending, (state: any) => {
            state.data = null;
            state.loading = true;
        });
        builder.addCase(CancelOrderServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(CancelOrderServiceHandler.rejected, (state: any, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload || "Failed to check running order.";
        });
    },
});

export default CancelOrderServiceSlice.reducer;