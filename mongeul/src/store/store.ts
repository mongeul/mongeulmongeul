import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./diarySlice";
import calendarReducer from "./calendarSlice";

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
