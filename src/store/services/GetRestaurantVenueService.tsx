import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetRestaurantVenue } from "../constant";

export const GetRestaurantVenueServiceHandler = createAsyncThunk(
    'post/GetRestaurantVenueService',
    async (data:any,thunkAPI) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const RestaurentId = await AsyncStorage.getItem('RestaurentId');
            if (!RestaurentId) {
                return thunkAPI.rejectWithValue('Restaurant ID not found');
            }
            const slug = JSON.parse(RestaurentId);
            
            const url = GetRestaurantVenue(data?.id);
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

export const GetRestaurantVenueServiceSlice = createSlice({
    name: 'GetRestaurantVenueService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRestaurantVenueServiceHandler.pending, (state) => {
            state.data = null;
            state.loading = true;
        });
        builder.addCase(GetRestaurantVenueServiceHandler.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(GetRestaurantVenueServiceHandler.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload || "Failed to get restaurant venue.";
        });
    },
});

export default GetRestaurantVenueServiceSlice.reducer;
