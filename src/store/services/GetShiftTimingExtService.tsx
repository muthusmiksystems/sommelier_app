import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetRestaurantVenue, GetShiftTimingExt } from "../constant";

export const GetShiftTimingExtServiceHandler = createAsyncThunk(
    'post/GetShiftTimingExtService',
    async (data:any,thunkAPI) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            console.log('data-',data)
            const url = GetShiftTimingExt(data);
            console.log('url-',url)
            return await axios.get(url, { headers: headers })
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log("Error1 in GetRestaurantVenueServiceHandler:", error);
                    return thunkAPI.rejectWithValue(error.response.data);
                });
        } catch (error) {
            console.log("Error2 in GetRestaurantVenueServiceHandler:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const GetShiftTimingExtServiceSlice = createSlice({
    name: 'GetShiftTimingExtService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetShiftTimingExtServiceHandler.pending, (state) => {
            state.data = null;
            state.loading = true;
        });
        builder.addCase(GetShiftTimingExtServiceHandler.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(GetShiftTimingExtServiceHandler.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload || "Failed to get restaurant venue.";
        });
    },
});

export default GetShiftTimingExtServiceSlice.reducer;
