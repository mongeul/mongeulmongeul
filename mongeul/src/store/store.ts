import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./diarySlice";
import pictureReducer from "./pictureSlice";
import calendarReducer from "./calendarSlice";
import userReducer from "./userSlice";
import shareDiaryReducer from "./shareDiarySlice";
import feedReducer from "./feedSlice";

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    picture: pictureReducer,
    calendar: calendarReducer,
    user: userReducer,
    shareDiary: shareDiaryReducer,
    feed: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["picture/setStageRef"],
        ignoredPaths: ["picture.stageRef"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
