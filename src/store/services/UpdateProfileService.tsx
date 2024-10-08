import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRestaurent, saveAddress, updateProfile} from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const updateProfileServiceHandler = createAsyncThunk(
    'post/updateProfileService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        try {
            const response = await axios.post(updateProfile, data, { headers: headers });
            return response.data; // Assuming you want to return only the data part of the response
        } catch (error) {
            console.log("Inside catch of reg...............", error); 
        }
    }
);

export const updateProfileServiceSlice = createSlice({
    name: 'updateProfileService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(updateProfileServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(updateProfileServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default updateProfileServiceSlice.reducer;