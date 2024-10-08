import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckRunningOrder, GetRestaurantSetting } from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetRestaurantSettingServiceHandler = createAsyncThunk(
    'post/GetRestaurantSettingService',
    async (data:any,thunkAPI) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            
            const url = GetRestaurantSetting(data);
            console.log('url==',url)
            return await axios.get(url, { headers: headers })
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log("Error1 in GetRestaurantSettingServiceHandler:", error);
                    return thunkAPI.rejectWithValue(error.response.data);
                });
        } catch (error) {
            console.log("Error2 in GetRestaurantSettingServiceHandler:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const GetRestaurantSettingServiceSlice = createSlice({
    name: 'GetRestaurantSettingService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRestaurantSettingServiceHandler.pending, (state: any) => {
            state.data = null;
            state.loading = true;
        });
        builder.addCase(GetRestaurantSettingServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(GetRestaurantSettingServiceHandler.rejected, (state: any, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload || "Failed to check running order.";
        });
    },
});

export default GetRestaurantSettingServiceSlice.reducer;