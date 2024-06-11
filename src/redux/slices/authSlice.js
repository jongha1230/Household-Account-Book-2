import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { logInSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
