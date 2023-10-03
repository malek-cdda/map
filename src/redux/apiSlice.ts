import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

const apiSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    mapSearch: () => {},
  },
});

export default apiSlice.reducer;
export const { mapSearch } = apiSlice.actions;
