import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = { userId: "", password: "" };
export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {
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
