import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedEmoji } from "@/types/feedTypes";
import { Feeling } from "@/types/diaryTypes";

interface FeedState {
  myFeed: boolean;
  feedDetailId: number | null;
  feedDetailEmojis: FeedEmoji[];
}

const initialState: FeedState = {
  myFeed: false,
  feedDetailId: null,
  feedDetailEmojis: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeedDetailEmojis: (state, action: PayloadAction<FeedEmoji[]>) => {
      state.feedDetailEmojis = action.payload;
    },
    toggleEmoji: (state, action: PayloadAction<Feeling>) => {
      const emojiType = action.payload;
      const existingEmoji = state.feedDetailEmojis.find(
        (emoji) => emoji.emojiType === emojiType
      );

      if (existingEmoji) {
        existingEmoji.isSelected = !existingEmoji.isSelected;
        existingEmoji.count += existingEmoji.isSelected ? 1 : -1;

        if (existingEmoji.count === 0) {
          state.feedDetailEmojis = state.feedDetailEmojis.filter(
            (emoji) => emoji.emojiType !== emojiType
          );
        }
      } else {
        state.feedDetailEmojis.push({
          emojiType,
          count: 1,
          isSelected: true,
        });
      }
    },
  },
});

export const { setFeedDetailEmojis, toggleEmoji } = feedSlice.actions;
export default feedSlice.reducer;
