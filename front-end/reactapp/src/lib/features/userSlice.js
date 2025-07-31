import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Methmal",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  //Instructions to change the state/slice
  reducers: {
    //Actions
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

//this outputs the userSlice actions
export const { setUser } = userSlice.actions;
//This outputs the state of the userSlice
export default userSlice.reducer;
