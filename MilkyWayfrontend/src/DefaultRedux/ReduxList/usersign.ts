import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface signup {
  userID: string;
  Password: string;
  email: string;
}
const initialSignStateValue: signup = {
  userID: "",
  Password: "",
  email: "",
};
export const userSignSlice = createSlice({
  name: "usersign",
  initialState: { value: initialSignStateValue },
  reducers: {
    setSignData: (state, action: PayloadAction<signup>) => {
      state.value = action.payload;
    },
  },
});

export default userSignSlice.reducer;

export const { setSignData } = userSignSlice.actions;

//login 정보에 관한 redux로 ManagerMainPage에서 사용하고 있는 상태
