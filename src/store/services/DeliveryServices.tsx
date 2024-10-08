import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUrl, restaurantUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const deliveryServiceHandler = createAsyncThunk(
    'post/deliveryService',
    async ( thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const paylod =
        {
            "latitude": "-34.9309923",
            "longitude": "138.6074298"
        }
        // try {
        return await axios.post(restaurantUrl, paylod, { headers: headers }).then(response => {
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
export const deliveryServiceSlice = createSlice({
    name: 'deliveryService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(deliveryServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(deliveryServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default deliveryServiceSlice.reducer;