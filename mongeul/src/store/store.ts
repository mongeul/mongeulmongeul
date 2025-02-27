import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./diarySlice";
import drawingReducer from "./drawingSlice";
import calendarReducer from "./calendarSlice";
import userReducer from "./userSlice";
import shareDiaryReducer from "./shareDiarySlice";

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    drawing: drawingReducer,
    calendar: calendarReducer,
    user: userReducer,
    shareDiary: shareDiaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
