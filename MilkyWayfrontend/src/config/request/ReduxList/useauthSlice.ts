import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userid: string | null;
  authMethod: "session"; // 고정
}

const initialState: AuthState = {
  isAuthenticated: false,
  userid: null,
  authMethod: "session",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (
      state,
      action: PayloadAction<{ userId: string; isAuthenticated: boolean }>
    ) => {
      state.userid = action.payload.userId;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userid = null;
    },
  },
});

export const { setSession, logout } = authSlice.actions;
export default authSlice.reducer;
//Session 정보를 담는 코드 - login 상태를 전역에서 관리하기 위한 목적
