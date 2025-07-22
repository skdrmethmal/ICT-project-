import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const searchSlice = createSlice({
  name: "search",
  //state that should be stored when the app starts
  initialState,
  //actions that can be performed on the state
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
