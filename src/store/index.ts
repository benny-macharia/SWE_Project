import { configureStore } from "@reduxjs/toolkit";
import BottomNavSlice from "./slices/bottom-nav";
import modalSlicer from "./slices/modal";
import homeSlice from "./slices/home";
import timetableSlice from "./slices/timetable";
import communicationSlice from "./slices/communications";

export default configureStore({
  reducer: {
    modal: modalSlicer,
    nav: BottomNavSlice,
    home: homeSlice,
    timetable: timetableSlice,
    communication: communicationSlice
  },
});
