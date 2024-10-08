import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAddress, getRestaurent, getSlide, saveAddress} from "../constant";
import {restaurentId as restaurentIds,restaurentSlug as restaurentSlug} from '../../../app.json'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getSlideServiceHandler = createAsyncThunk(
    'post/getSlideService',
    async ( thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const RestaurentId= await AsyncStorage.getItem('RestaurentId') 
        const data={
            "restaurant_id":RestaurentId ? RestaurentId : restaurentIds
        }
        try {
            const response = await axios.post(getSlide, data, { headers: headers });
            return response.data; // Assuming you want to return only the data part of the response
        } catch (error) {
            console.log("Inside catch of slider...............", error);
        }
    }
);

export const getSlideServiceSlice = createSlice({
    name: 'getSlideService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getSlideServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(getSlideServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default getSlideServiceSlice.reducer;