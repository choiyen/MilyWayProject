import { NoticeDetailType } from "@/types/Feature/Notice/NoticeAll";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialNoticeDetailStateValue: NoticeDetailType[] = [
  {
    NoticeId: "",
    direction: "",
    beforeURL: [],
    afterURL: [],
    comment: "",
  },
];
export const NoticeDetailSave = createSlice({
  name: "setNoticeDetailData",
  initialState: { value: initialNoticeDetailStateValue },
  reducers: {
    setNoticeDetailData: (state, action: PayloadAction<NoticeDetailType[]>) => {
      state.value = action.payload;
    },
  },
});

export default NoticeDetailSave.reducer;
export const { setNoticeDetailData } = NoticeDetailSave.actions;

// Notice에 관한 redux로 현재 ManagerAdvice에서 사용되고 있음
