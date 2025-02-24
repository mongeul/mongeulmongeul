import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary } from "@/types/diaryTypes";

interface CalendarState {
  selectedDate: string;
  selectedDiary: Diary | null;
  currentMonth: { year: number; month: number };
  diaryDates: string[];
}

const initialState: CalendarState = {
  selectedDate: "",
  selectedDiary: null,
  currentMonth: { year: 2025, month: 2 },
  diaryDates: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedDiary: (state, action: PayloadAction<Diary | null>) => {
      state.selectedDiary = action.payload;
    },
    setCurrentMonth: (
      state,
      action: PayloadAction<{ year: number; month: number }>
    ) => {
      state.currentMonth = action.payload;
    },
    setDiaryDates: (state, action: PayloadAction<string[]>) => {
      state.diaryDates = action.payload;
    },
  },
});

export const {
  setSelectedDate,
  setSelectedDiary,
  setCurrentMonth,
  setDiaryDates,
} = calendarSlice.actions;
export default calendarSlice.reducer;
