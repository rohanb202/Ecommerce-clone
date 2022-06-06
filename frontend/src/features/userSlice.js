import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  isLoading: false,
};
export const userLogin = createAsyncThunk(
  "userSlice/Login",
  async ({ email, password }) => {
    try {
      //console.log(payload);
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    [userLogin.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export default userSlice.reducer;
