import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getuserurl, registerUrl, restaurantUrl } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getuserServiceHandler = createAsyncThunk(
    'post/deliveryService',
    async (data ,thunkAPI) => {
        
        const headers = {
            'Content-Type': 'application/json'
        };
        // try {
        return await axios.post(getuserurl, data, { headers: headers }).then(response => {
            return response;
        })
            .catch(error => {
                console.log("Inside splash of reg...............", error);
            })
        // } catch (error) {
        //     console.log("error catch of login...............", error);
        //     throw error;
        // }
    }
);
export const getuserServiceSlice = createSlice({
    name: 'getuserService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getuserServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(getuserServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default getuserServiceSlice.reducer;