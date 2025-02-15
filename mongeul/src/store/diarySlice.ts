import { Disclosure, Emotion } from "@/types/diaryTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiaryState {
  title: string;
  content: string;
  date: string;
  emotion: Emotion;
  weather: string;
  disclosure: Disclosure;
}

const initialState: DiaryState = {
  title: "",
  content: "",
  date: "",
  emotion: "" as Emotion,
  weather: "",
  disclosure: "unlocked" as Disclosure,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setEmotion: (state, action: PayloadAction<Emotion>) => {
      state.emotion = action.payload;
    },
    setWeather: (state, action: PayloadAction<string>) => {
      state.weather = action.payload;
    },
    setDisclosure: (state, action: PayloadAction<Disclosure>) => {
      state.disclosure = action.payload;
    },
    resetDiary: () => initialState,
  },
});

export const {
  setTitle,
  setContent,
  setDate,
  setEmotion,
  setWeather,
  setDisclosure,
  resetDiary,
} = diarySlice.actions;
export default diarySlice.reducer;
