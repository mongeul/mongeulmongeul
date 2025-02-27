import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend } from "@/lib/api/sharediary";

interface ShareDiaryState {
  friends: Friend[];
}

const initialState: ShareDiaryState = {
  friends: [],
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
  },
});

export const { setFriends, updateFriendOrder } = shareDiarySlice.actions;
export default shareDiarySlice.reducer;
