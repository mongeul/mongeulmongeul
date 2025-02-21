import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./diarySlice";
import drawingReducer from "./drawingSlice";

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    drawing: drawingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
