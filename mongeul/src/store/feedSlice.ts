import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  myFeed: boolean;
  feedDetailId: number | null;
}

const initialState: FeedState = {
  myFeed: false,
  feedDetailId: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setMyFeed: (state, action: PayloadAction<boolean>) => {
      state.myFeed = action.payload;
    },
    setFeedDetailId: (state, action: PayloadAction<number | null>) => {
      state.feedDetailId = action.payload;
    },
    resetFeed: () => initialState,
  },
});

export const { setMyFeed, setFeedDetailId, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
