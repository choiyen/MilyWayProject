import { loginType } from "@/types/ProjectDataType";
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

//login 정보에 관한 redux로 ManagerMainPage에서 사용되고 있음
