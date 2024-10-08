import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUrl, restaurantUrl, updateFingerprint } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fingerprintServiceHandler = createAsyncThunk(
    'post/fingerprintService',
    async (data, thunkAPI) => {
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        // try {
        return await axios.post(updateFingerprint, data, { headers: headers }).then(response => {
            return response;
        })
            .catch(error => {
                console.log("Inside catch of reg...............", error);
            })
        // } catch (error) {
        //     console.log("error catch of login...............", error);
        //     throw error;
        // }
    }
);
export const fingerprintServiceSlice = createSlice({
    name: 'fingerprintService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fingerprintServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(fingerprintServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default fingerprintServiceSlice.reducer;