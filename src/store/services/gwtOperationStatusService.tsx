import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRestaurantInfoAndOperationalStatus, registerUrl} from "../constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {restaurentId as restaurentIds,restaurentSlug as restaurentSlug} from '../../../app.json'
export const operationStatusServiceHandler = createAsyncThunk(
    'post/operationStatusService',
    async (data: any, thunkAPI) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        let storeid= await AsyncStorage.getItem('restaurentId')
        const payload = {
            id:storeid ? storeid : restaurentIds,
            latitude:data.default_address.latitude,
            longitude:data.default_address.longitude,
        }
            return await axios.post(getRestaurantInfoAndOperationalStatus, payload, { headers: headers }).then(response => {
                
                return response;
            })
            .catch(error => {
                console.log("Inside catch of operationStatusService...............", error);
              })
    }
);
export const operationStatusServiceSlice = createSlice({
    name: 'operationStatusService',
    initialState: {
        data: null,
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(operationStatusServiceHandler.pending, (state: any) => {
            state.data = [];
            state.loading = true

        })
        builder.addCase(operationStatusServiceHandler.fulfilled, (state:any, action) => {
            state.data = action.payload;
            state.loading = false
        })
    },
})
export default operationStatusServiceSlice.reducer;