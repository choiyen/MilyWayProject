import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface login {
  userID: string;
  Password: string;
}
const initialStateValue: login = { userID: "", Password: "" };
export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action: PayloadAction<login>) => {
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
