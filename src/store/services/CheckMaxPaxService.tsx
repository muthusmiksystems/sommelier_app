import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckMaxPax, CheckRunningOrder } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const CheckMaxPaxServiceHandler = createAsyncThunk(
    'post/CheckMaxPaxService',
    async (data: any, thunkAPI) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            console.log('payload', data)
            return await axios.post(CheckMaxPax, data, { headers: headers })
                .then(response => {
                    console.log('oooo---')
                    return response;
                })
                .catch(error => {
                    console.log("Inside CheckMaxPaxService of device...............", error);
                    return thunkAPI.rejectWithValue(error.response.data);
                });
        } catch (error: any) {
            console.log("Error in CheckMaxPaxService:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const CheckMaxPaxServiceSlice = createSlice({
    name: 'CheckMaxPaxService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CheckMaxPaxServiceHandler.pending, (state: any) => {
            state.data = null;
            state.loading = true;
        });
        builder.addCase(CheckMaxPaxServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(CheckMaxPaxServiceHandler.rejected, (state: any, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload || "Failed to check running order.";
        });
    },
});

export default CheckMaxPaxServiceSlice.reducer;