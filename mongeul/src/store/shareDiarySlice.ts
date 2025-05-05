import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend } from "@/lib/api/shared-diary";
import { Feeling, Weather } from "@/types/diaryTypes";

interface SharedDiaryEntry {
  date: string;
  diaryId: number;
  feeling: Feeling;
  weather: Weather;
}

interface ShareDiaryState {
  friends: Friend[];
  sharedDiaryEntries: SharedDiaryEntry[];
}

const initialState: ShareDiaryState = {
  friends: [],
  sharedDiaryEntries: [],
};

export const shareDiarySlice = createSlice({
  name: "shareDiary",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
    updateFriendOrder: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
    setSharedDiaryEntries: (
      state,
      action: PayloadAction<SharedDiaryEntry[]>
    ) => {
      state.sharedDiaryEntries = action.payload;
    },
  },
});

export const { setFriends, updateFriendOrder, setSharedDiaryEntries } =
  shareDiarySlice.actions;
export default shareDiarySlice.reducer;
