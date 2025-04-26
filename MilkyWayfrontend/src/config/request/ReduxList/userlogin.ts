import { loginType } from "@/types/Feature/Join/Join";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateValue: loginType = { userID: "", Password: "" };
export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action: PayloadAction<loginType>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
//로그인을 위한 세션 정보를 담는 redux
