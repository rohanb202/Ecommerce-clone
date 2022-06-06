import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  isLoading: false,
};
export const getProduct = createAsyncThunk(
  "productSlice/getProduct",
  async (payload) => {
    try {
      //console.log(payload);

      const { data } = await axios.get(`/api/products/${payload}`);
      // const response = await fetch(`http://localhost:5000/api/products`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      //console.log(action);
      state.isLoading = false;
      state.product = action.payload;
    },
    [getProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export default productSlice.reducer;
