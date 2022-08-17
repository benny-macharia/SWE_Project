import { createSlice } from "@reduxjs/toolkit";

export const communicationSlice = createSlice({
  name: "communication",
  initialState: { communication: [] },
  reducers: {
    dispatchCommunicationData: (state, action) => {
      state.communication = [...state.communication, action.payload]
    },
    updateCommunicationData: (state, action) => {
      state.communication.forEach((data_) => {
        if (data_.id === action.payload.id) {
          data_ = action.payload.data;
        }
      });
    },
  },
});

export const {dispatchCommunicationData, updateCommunicationData} = communicationSlice.actions;
export default communicationSlice.reducer;
