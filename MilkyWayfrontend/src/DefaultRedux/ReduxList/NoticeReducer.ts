import { NoticeType } from "@/types/Feature/ProjectDataType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialNoticeStateValue: NoticeType = {
  type: "",
  greeting: "",
};

export const NoticeSave = createSlice({
  name: "setNoticeData",
  initialState: { value: initialNoticeStateValue },
  reducers: {
    setNoticeData: (state, action: PayloadAction<NoticeType>) => {
      state.value = action.payload;
    },
  },
});

export default NoticeSave.reducer;
export const { setNoticeData } = NoticeSave.actions;

// Notice에 관한 redux로 현재 ManagerAdvice에서 사용되고 있음
