import { PrivateStatus, Feeling, Weather } from "@/types/diaryTypes";
import { PictureLine } from "@/types/pictureTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiaryState {
  title: string;
  date: string;
  content: string;
  picture: string | null;
  pictureLines: PictureLine[] | null;
  feeling: Feeling;
  weather: Weather;
  privateStatus: PrivateStatus;
}

const initialState: DiaryState = {
  title: "",
  date: new Date().toISOString().split("T")[0],
  content: "",
  picture: null,
  pictureLines: null,
  feeling: null,
  weather: null,
  privateStatus: "PRIVATE" as PrivateStatus,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setPicture: (state, action: PayloadAction<string | null>) => {
      state.picture = action.payload;
    },
    setPictureLines: (state, action: PayloadAction<PictureLine[] | null>) => {
      state.pictureLines = action.payload ?? [];
    },
    setFeeling: (state, action: PayloadAction<Feeling>) => {
      state.feeling = action.payload;
    },
    setWeather: (state, action: PayloadAction<Weather>) => {
      state.weather = action.payload;
    },
    setPrivateStatus: (state, action: PayloadAction<PrivateStatus>) => {
      state.privateStatus = action.payload;
    },
    resetDiary: () => initialState,
  },
});

export const {
  setTitle,
  setDate,
  setContent,
  setPicture,
  setPictureLines,
  setFeeling,
  setWeather,
  setPrivateStatus,
  resetDiary,
} = diarySlice.actions;
export default diarySlice.reducer;
