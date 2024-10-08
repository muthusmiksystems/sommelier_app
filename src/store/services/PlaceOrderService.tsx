import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRestaurent, placeorder, saveAddress } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const placeOrderServiceHandler = createAsyncThunk(
    'post/placeOrderService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.post(placeorder, data, { headers: headers });
            return response.data; // Assuming you want to return only the data part of the response
        } catch (error) {
            console.log("Inside catch of reg...............", error);
            throw error;
        }
    }
);

export const placeOrderServiceSlice = createSlice({
    name: 'placeOrderService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(placeOrderServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(placeOrderServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default placeOrderServiceSlice.reducer;