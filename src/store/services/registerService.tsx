import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restaurentId as restaurentId, restaurentSlug as restaurentSlug } from '../../../app.json'
export const registerServiceHandler = createAsyncThunk(
    'post/registerService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const payload = {
            ...data,
            storeId: restaurentId
        }
        console.log('otp', data)
        return await axios.post(registerUrl, payload, { headers: headers }).then(response => {
            console.log('otp', response.data)
            return response;
        })
            .catch(error => {
                console.log("Inside catch of reg...............", error);
            })
    }
);
export const registerServiceSlice = createSlice({
    name: 'registerService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(registerServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(registerServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default registerServiceSlice.reducer;