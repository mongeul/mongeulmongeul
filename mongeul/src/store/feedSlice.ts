import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  myFeed: boolean;
}

const initialState: FeedState = {
  myFeed: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setMyFeed: (state, action: PayloadAction<boolean>) => {
      state.myFeed = action.payload;
    },
    resetFeed: () => initialState,
  },
});

export const { setMyFeed, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
