import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({ 
  name: "srh",
  initialState: {
    hide: localStorage.getItem("search")
      ? JSON.parse(localStorage.getItem("search"))
      : false,
  },
  reducers: {
    activeSearch: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.hide = action.payload;
    },
    logout:(state)=>{state.user=null}
  },
});

// Action creators are generated for each case reducer function
export const { activeSearch } = searchSlice.actions;

export default searchSlice.reducer;