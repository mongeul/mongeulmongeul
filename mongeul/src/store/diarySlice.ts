import { PrivateStatus, Feelings, Weather } from "@/types/diaryTypes";
import { DrawingLine } from "@/types/drawingTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiaryState {
  title: string;
  date: string;
  content: string;
  drawing: string | null;
  drawingImage: string | null;
  feelings: Feelings;
  weather: Weather;
  privateStatus: PrivateStatus;
}

const initialState: DiaryState = {
  title: "",
  date: new Date().toISOString().split("T")[0],
  content: "",
  drawing: null,
  drawingImage: null,
  feelings: "" as Feelings,
  weather: "" as Weather,
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
    setDrawing: (state, action: PayloadAction<string | null>) => {
      state.drawing = action.payload;
    },
    setDrawingImage: (state, action: PayloadAction<string | null>) => {
      state.drawingImage = action.payload;
    },
    setFeelings: (state, action: PayloadAction<Feelings>) => {
      state.feelings = action.payload;
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
  setDrawing,
  setDrawingImage,
  setFeelings,
  setWeather,
  setPrivateStatus,
  resetDiary,
} = diarySlice.actions;
export default diarySlice.reducer;
