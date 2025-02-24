import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./diarySlice";
import drawingReducer from "./drawingSlice";
import calendarReducer from "./calendarSlice";

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    drawing: drawingReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
