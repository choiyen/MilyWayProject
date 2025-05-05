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
  initialState: { value: initialState },
  reducers: {
    setSession: (
      state,
      action: PayloadAction<{ userId: string; isAuthenticated: boolean }>
    ) => {
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
