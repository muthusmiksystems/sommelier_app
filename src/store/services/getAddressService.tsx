import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAddress, getRestaurent, saveAddress} from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getAddressServiceHandler = createAsyncThunk(
    'post/getAddressService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.post(getAddress, data, { headers: headers });
            return response.data; // Assuming you want to return only the data part of the response
        } catch (error) {
            console.log("Inside catch of reg...............", error);
        }
    }
);

export const getAddressServiceSlice = createSlice({
    name: 'getAddressService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAddressServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(getAddressServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default getAddressServiceSlice.reducer;