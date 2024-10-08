import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRestaurentDetailsUrl, restaurantfooddetailsUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {restaurentId as restaurentId,restaurentSlug as restaurentSlug} from '../../../app.json'
export const getRestaurentDetailsServiceHandler = createAsyncThunk(
    'post/getRestaurentDetailsService',
    async ( thunkAPI) => {
        const slug = await AsyncStorage.getItem('restaurentSlug')
        const headers = {
            'Content-Type': 'application/json'
        };
        
        try {
            const response = await axios.post(slug ? `${getRestaurentDetailsUrl}/${slug}` : `${getRestaurentDetailsUrl}/${restaurentSlug}` ,  { headers: headers });
            return response.data; // Assuming you want to return only the data part of the response
        } catch (error) {
            console.log("Inside catch of resta initial...............", error);
            throw error;
        }
    }
);

export const getRestaurentDetailsServiceSlice = createSlice({
    name: 'getRestaurentDetailsService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getRestaurentDetailsServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(getRestaurentDetailsServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default getRestaurentDetailsServiceSlice.reducer;