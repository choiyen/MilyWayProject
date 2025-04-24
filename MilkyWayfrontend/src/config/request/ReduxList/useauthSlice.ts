import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  sessionid: string | null;
  isAuthenticated: boolean;
  userid: string | null;
  socialld: number | null;
  authMethod: "jwt" | "session" | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  sessionid: null,
  isAuthenticated: false,
  userid: null,
  socialld: null,
  authMethod: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setjwtTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        userId: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userid = action.payload.userId;
      state.isAuthenticated = true;
      state.authMethod = "jwt";
    },
    setSession: (
      state,
      action: PayloadAction<{
        sessionId: string;
        userId: string;
      }>
    ) => {
      state.sessionid = action.payload.sessionId;
      state.userid = action.payload.userId;
      state.isAuthenticated = true;
      state.authMethod = "session";
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionid = null;
      state.isAuthenticated = false;
      state.userid = null;
      state.socialld = null;
      state.authMethod = null;
    },
  },
});

export const { setjwtTokens, setSession, logout } = authSlice.actions;
export default authSlice.reducer;
