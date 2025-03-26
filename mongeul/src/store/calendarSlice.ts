import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary } from "@/types/diaryTypes";

interface DiaryEntry {
  date: string;
  diaryId: number;
  privateStatus: string;
}

interface CalendarState {
  selectedDate: string;
  selectedDiary: Diary | "LOCK" | null;
  currentMonth: { year: number; month: number };
  diaryEntries: DiaryEntry[];
  lockedDiaryId: number | null;
}

const today = new Date();
const initialState: CalendarState = {
  selectedDate: "",
  selectedDiary: null,
  currentMonth: {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  },
  diaryEntries: [],
  lockedDiaryId: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedDiary: (state, action: PayloadAction<Diary | "LOCK" | null>) => {
      state.selectedDiary = action.payload;
    },
    setCurrentMonth: (
      state,
      action: PayloadAction<{ year: number; month: number }>
    ) => {
      state.currentMonth = action.payload;
    },
    setDiaryEntries: (state, action: PayloadAction<DiaryEntry[]>) => {
      state.diaryEntries = action.payload;
    },
    setLockedDiaryId: (state, action: PayloadAction<number | null>) => {
      state.lockedDiaryId = action.payload;
    },
  },
});

export const {
  setSelectedDate,
  setSelectedDiary,
  setCurrentMonth,
  setDiaryEntries,
  setLockedDiaryId,
} = calendarSlice.actions;
export default calendarSlice.reducer;
