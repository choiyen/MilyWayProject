import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notice {
  NoticeId: string;
  type: string;
  greeting: string;
}

const initialNoticeStateValue: Notice = {
  NoticeId: "",
  type: "",
  greeting: "",
};

export const NoticeSave = createSlice({
  name: "setNoticeData",
  initialState: { value: initialNoticeStateValue },
  reducers: {
    setNoticeData: (state, action: PayloadAction<Notice>) => {
      state.value = action.payload;
    },
  },
});

export default NoticeSave.reducer;
export const { setNoticeData } = NoticeSave.actions;
