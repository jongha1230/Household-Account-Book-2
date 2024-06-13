import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import modalReducer from "../slices/modalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});

export default store;
