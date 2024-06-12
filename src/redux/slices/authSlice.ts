import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
}

interface User {
  id: string;
  avatar: string | null;
  nickname: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: localStorage.getItem("accessToken"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (
      state: Draft<AuthState>,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
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
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { logInSuccess, logOut, updateUser } = authSlice.actions;

export default authSlice.reducer;
