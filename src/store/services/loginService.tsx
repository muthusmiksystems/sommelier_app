
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUrl, otpUrl, registerotpUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restaurentId as restaurentId, restaurentSlug as restaurentSlug } from '../../../app.json'
import axios from "axios";
export const loginServiceHandler = createAsyncThunk(
    'post/loginService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const payload = {
            ...data,
            storeId: restaurentId
        }
        console.log("log", data)
        try {
            const response = await axios.post(loginUrl, payload, { headers: headers });
            return response.data;
        } catch (error) {
            console.log("Inside catch of login...............", error);
            throw error;
        }
    }
);
export const loginOtpHandler = createAsyncThunk(
    'post/loginService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        console.log('otpUrls', otpUrl)
        const payload = {
            ...data,
            storeId: restaurentId
        }
        console.log('payload', payload)

        try {
            const response = await axios.post(otpUrl, payload, { headers: headers });
            console.log('responseqq', response.data)
            return response.data;
        } catch (error) {
            console.log("Inside catch of login...............", error);
            throw error;
        }
    }
);
export const registerOtpHandler = createAsyncThunk(
    'post/loginService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        console.log('otpUrls', registerotpUrl)
        const payload = {
            ...data,
            storeId: restaurentId
        }
        console.log('payload', payload)

        try {
            const response = await axios.post(registerotpUrl, payload, { headers: headers });
            console.log('responseqq', response.data)
            return response.data;
        } catch (error) {
            console.log("Inside catch of login...............", error);
            throw error;
        }
    }
);
export const loginServiceSlice = createSlice({
    name: 'loginService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {
        logindetails: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(loginServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(loginServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export const { logindetails } = loginServiceSlice.actions;
export default loginServiceSlice.reducer;