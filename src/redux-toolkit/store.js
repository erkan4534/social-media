import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    authSlice: authReducer,
    userSlice: userReducer,
  },
});

export default store;
