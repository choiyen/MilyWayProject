import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
    userid: null,
    authMethod: "session",
};
const authSlice = createSlice({
    name: "auth",
    initialState: { value: initialState },
    reducers: {
        setSession: (state, action) => {
            state.value.userid = action.payload.userId;
            state.value.isAuthenticated = true;
        },
        Sessionout: (state) => {
            state.value.isAuthenticated = false;
            state.value.userid = null;
        },
    },
});
export const { setSession, Sessionout } = authSlice.actions;
export default authSlice.reducer;
//Session 정보를 담는 코드 - login 상태를 전역에서 관리하기 위한 목적
