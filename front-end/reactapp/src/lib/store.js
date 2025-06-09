import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userReducer from "./features/userSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    user: userReducer, // sync slice react-redux
    [api.reducerPath]: api.reducer, // async slice redux-toolkit
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
