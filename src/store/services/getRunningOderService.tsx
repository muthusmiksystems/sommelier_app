import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetRunningOrder } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetRunningOrderServiceHandler = createAsyncThunk(
    'post/GetRunningOrderService',
    async (data: any, thunkAPI) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const tokenString = await AsyncStorage.getItem('UserToken');
            const slug = tokenString ? JSON.parse(tokenString) : {};
            const payload = {
                token: slug?.auth_token,
            };
            console.log("url--",GetRunningOrder)
            return await axios.post(GetRunningOrder, payload, { headers: headers })
                .then(response => {
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

export const GetRunningOrderServiceSlice = createSlice({
    name: 'GetRunningOrderService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRunningOrderServiceHandler.pending, (state: any) => {
            state.data = null;
            state.loading = true;
        });
        builder.addCase(GetRunningOrderServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(GetRunningOrderServiceHandler.rejected, (state: any, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload || "Failed to check running order.";
        });
    },
});

export default GetRunningOrderServiceSlice.reducer;