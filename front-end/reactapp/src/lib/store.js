import { configureStore } from "@reduxjs/toolkit";
//For caching data
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userReducer from "./features/userSlice";
import { api } from "./api";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // sync slice react-redux redux-toolkit
    search: searchReducer, // sync slice redux-toolkit
    [api.reducerPath]: api.reducer, // async slice redux-toolkit react-query
  },
  //For caching data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

//For caching data
setupListeners(store.dispatch);
