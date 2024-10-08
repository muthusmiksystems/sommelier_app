import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckAvailabilityService} from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const CheckAvailabilityServiceHandler = createAsyncThunk(
    'post/CheckAvailabilityService',
    async (data: any, thunkAPI) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        return await axios.post(CheckAvailabilityService, data, { headers: headers }).then(response => {
            return response;
        })
            .catch(error => {
                console.log("Inside deviceinfo of device...............", error);
            })
        // } catch (error) {
        //     console.log("error catch of login...............", error);
        //     throw error;
        // }
    }
);
export const CheckAvailabilityServiceSlice = createSlice({
    name: 'CheckAvailabilityService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(CheckAvailabilityServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(CheckAvailabilityServiceHandler.fulfilled, (state: any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default CheckAvailabilityServiceSlice.reducer;