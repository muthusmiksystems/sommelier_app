import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restaurantfooddetailsUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const foodDetailsServiceHandler = createAsyncThunk(
    'post/foodDetailsService',
    async ( thunkAPI) => {
        const slug=await AsyncStorage.getItem('restaurentSlug')
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        try {
            const response = await axios.post(`${restaurantfooddetailsUrl}/${slug}`,  { headers: headers });

            return response.data; // Assuming you want to return only the data part of the response
        } catch (error) {
            console.log("Inside catch of reg...............", error);
            throw error;
        }
    }
);

export const foodDetailsServiceSlice = createSlice({
    name: 'foodDetailsService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(foodDetailsServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(foodDetailsServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default foodDetailsServiceSlice.reducer;