import { createSlice } from "@reduxjs/toolkit";
const globalReducer = createSlice({
  name: "global",
  initialState: {
    success: "",
    searchBar: false,
    openSidebar: false,
  },
  reducers: {
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearMessage: (state) => {
      state.success = "";
    },
  },
});
export const { setSuccess, clearMessage, setOpenSidebar } =
  globalReducer.actions;
export default globalReducer.reducer;
