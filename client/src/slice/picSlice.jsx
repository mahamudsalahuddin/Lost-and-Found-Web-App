import { createSlice } from "@reduxjs/toolkit";

export const picSlice = createSlice({ 
  name: "pic",
  initialState: {
    proPic: localStorage.getItem("proPic")
      ? JSON.parse(localStorage.getItem("proPic"))
      : null,
  },
  reducers: {
    activePic: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.proPic = action.payload;
    },
    logout:(state)=>{state.user=null}
  },
});

// Action creators are generated for each case reducer function
export const { activePic } = picSlice.actions;

export default picSlice.reducer;