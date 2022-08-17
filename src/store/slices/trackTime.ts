import { createSlice } from "@reduxjs/toolkit";

export const trackTimeSlice = createSlice({
  name: "trackTime",
  initialState: { trackTime: [] },
  reducers: {
    dispatchTrackTimeData: (state, action) => {
      state.trackTime.concat(action.payload);
    },
    updateTrackTimeData: (state, action) => {
      state.trackTime.forEach((data_) => {
        if (data_.id === action.payload.id) {
          data_ = action.payload.data;
        }
      });
    },
  },
});

export const { dispatchTrackTimeData, updateTrackTimeData } =
  trackTimeSlice.actions;
export default trackTimeSlice.reducer;
