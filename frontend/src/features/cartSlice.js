import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  isLoading: false,
};

export const addToCartApi = createAsyncThunk(
  "cartSlice/addTocartApi",
  async ({ id, qty }, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return {
        product: data._id,
        name: data.name,
        price: data.price,
        qty: qty,
        countInStock: data.countInStock,
        image: data.image,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      //console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // console.log(localStorage.getItem("cartItems"));
      // console.log(state.cartItems);
    },
  },
  extraReducers: {
    [addToCartApi.pending]: (state) => {
      state.isLoading = true;
    },
    [addToCartApi.fulfilled]: (state, action) => {
      //console.log(action);
      state.isLoading = false;

      const existingItem = state.cartItems.find(
        (item) => item.product === action.payload.product
      );

      if (existingItem) {
        // existingItem.qty += action.payload.qty;

        state.cartItems.find(
          (item) => item.product === action.payload.product
        ).qty = action.payload.qty;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    [addToCartApi.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export default cartSlice.reducer;
export const { removeFromCart } = cartSlice.actions;
