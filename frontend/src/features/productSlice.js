import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
};
export const getProductList = createAsyncThunk(
  "productSlice/getProductList",
  async () => {
    try {
      const { data } = await axios.get(`/api/products`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductList.fulfilled]: (state, action) => {
      //console.log(action);
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProductList.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export default productListSlice.reducer;
