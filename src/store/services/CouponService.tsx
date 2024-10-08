import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { coupon, registerUrl} from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {restaurentId as restaurentIds,restaurentSlug as restaurentSlug} from '../../../app.json'
export const couponServiceHandler = createAsyncThunk(
    'post/couponService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        let storeid= await AsyncStorage.getItem('restaurentId')
        const payload = {
            restaurant_id:storeid ? storeid : restaurentIds,
           ...data
        }
        console.log('payload',payload)
            return await axios.post(coupon, payload, { headers: headers }).then(response => {
                return response;
            })
            .catch(error => {
                console.log("Inside catch of coupon...............", error);
              })
    }
);
export const couponServiceSlice = createSlice({
    name: 'couponService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(couponServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(couponServiceHandler.fulfilled, (state:any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default couponServiceSlice.reducer;