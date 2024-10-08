import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from "redux";

// Define the structure of your state
interface Product {
    id: number;
    quantity: number;
    [key: string]: any;
}

interface AddProductState {
    products: { [id: number]: Product };
}

// Initial state
const initialState: AddProductState = {
    products: {},
};

// Async function to load products from AsyncStorage
const loadProductsFromStorage = async (): Promise<{ [id: number]: Product }> => {
    try {
        const storedProducts = await AsyncStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : {};
    } catch (error) {
        console.error('Failed to load products from storage', error);
        return {};
    }
};

// Async function to save products to AsyncStorage
const saveProductsToStorage = async (products: { [id: number]: Product }) => {
    try {
        await AsyncStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
        console.error('Failed to save products to storage', error);
    }
};

// Redux slice
export const AddProductService = createSlice({
    name: 'addProduct',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<{ [id: number]: Product }>) => {
            state.products = action.payload;
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            const { id } = action.payload;
            if (state.products[id]) {
                state.products[id].quantity += 1;
            } else {
                state.products[id] = { ...action.payload };
            }
            saveProductsToStorage(state.products);
        },
        removeProduct: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload;
            if (state.products[id]) {
                if (state.products[id].quantity > 1) {
                    state.products[id].quantity -= 1;
                } else {
                    delete state.products[id];
                }
            }
            saveProductsToStorage(state.products);
        },
    },
});

export const { addProduct, removeProduct, setProducts } = AddProductService.actions;

// Thunk to load products from storage initially
export const loadInitialProducts = () => async (dispatch: Dispatch) => {
    const products = await loadProductsFromStorage();
    dispatch(setProducts(products));
};

export default AddProductService.reducer;
