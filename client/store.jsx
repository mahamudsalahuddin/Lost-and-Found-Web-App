import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./src/slice/userSlice";
import picSlice from "./src/slice/picSlice";
import searchSlice from "./src/slice/searchSlice"
export default configureStore({
  reducer: {
    userStoreData: userSlice,
    userPic: picSlice,
    popUp:searchSlice,
  },
});
