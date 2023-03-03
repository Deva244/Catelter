import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import catReducer from "../features/cat/catSlice";
import messageReducer from "../features/message/messageSlice";
import formReducer from "../features/form/formSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cat: catReducer,
    message: messageReducer,
    form: formReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
