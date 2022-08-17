import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: { home: [] },
  reducers: {
    dispatchHomeData: (state, action) => {
      state.home = [...state.home, action.payload];
    },
    updateHomeData: (state, action) => {
      state.home.forEach((data_) => {
        if (data_.id === action.payload.id) {
          data_ = action.payload.data;
        }
      });
    },
  },
});

export const {dispatchHomeData, updateHomeData} = homeSlice.actions;
export default homeSlice.reducer;
