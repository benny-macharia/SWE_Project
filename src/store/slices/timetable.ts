import { createSlice } from "@reduxjs/toolkit";

export const timetableSlice = createSlice({
  name: "timetable",
  initialState: { timetable: [] },
  reducers: {
    dispatchTimetableData: (state, action) => {
      state.timetable = [...state.timetable, action.payload];
    },
    updateTimetableData: (state, action) => {
      state.timetable.forEach((data_) => {
        if (data_.id === action.payload.id) {
          data_ = action.payload.data;
        }
      });
    },
  },
});

export const {dispatchTimetableData, updateTimetableData} = timetableSlice.actions;
export default timetableSlice.reducer;
