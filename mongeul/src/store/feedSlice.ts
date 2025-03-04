import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  myFeed: boolean;
  lastDiaryId: number | null;
}

const initialState: FeedState = {
  myFeed: false,
  lastDiaryId: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setMyFeed: (state, action: PayloadAction<boolean>) => {
      state.myFeed = action.payload;
    },
    setLastDiaryId: (state, action: PayloadAction<number | null>) => {
      state.lastDiaryId = action.payload;
    },
    resetFeed: () => initialState,
  },
});

export const { setMyFeed, setLastDiaryId, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
