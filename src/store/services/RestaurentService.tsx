import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRestaurent} from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getRestaurentServiceHandler = createAsyncThunk(
    'post/getRestaurentService',
    async ( thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        try {
            const response = await axios.post(getRestaurent,  { headers: headers });
            return response.data; // Assuming you want to return only the data part of the response
        } catch (error) {
            console.log("Inside catch of reg...............", error);
            throw error;
        }
    }
);

export const getRestaurentServiceSlice = createSlice({
    name: 'getRestaurentService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getRestaurentServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(getRestaurentServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default getRestaurentServiceSlice.reducer;