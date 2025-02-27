import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  nickname: string | null;
  email: string | null;
}

const initialState: UserState = {
  id: null,
  nickname: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
    },
    updateNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    clearUser: () => initialState, // 로그아웃 시 초기화
  },
});

export const { setUser, updateNickname, clearUser } = userSlice.actions;
export default userSlice.reducer;
