import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface signup {
  userID: String;
  Password: String;
  email: String;
}
const initialSignStateValue: signup = {
  userID: '',
  Password: '',
  email: '',
};
export const userSignSlice = createSlice({
  name: 'usersign',
  initialState: {value: initialSignStateValue},
  reducers: {
    setSignData: (state, action: PayloadAction<signup>) => {
      state.value = action.payload;
    },
  },
});

export default userSignSlice.reducer;
export const {setSignData} = userSignSlice.actions;

//login 정보에 관한 redux
