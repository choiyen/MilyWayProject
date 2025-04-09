import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NoticeDetail {
  NoticeDetailId?: string;
  NoticeId?: string;
  direction: string;
  beforeURL: File[];
  afterURL: File[];
  Advice: string;
}

const initialNoticeDetailStateValue: NoticeDetail[] = [
  {
    NoticeId: "",
    direction: "",
    beforeURL: [],
    afterURL: [],
    Advice: "",
  },
];
export const NoticeDetailSave = createSlice({
  name: "setNoticeDetailData",
  initialState: { value: initialNoticeDetailStateValue },
  reducers: {
    setNoticeDetailData: (state, action: PayloadAction<NoticeDetail[]>) => {
      state.value = action.payload;
    },
  },
});

export default NoticeDetailSave.reducer;
export const { setNoticeDetailData } = NoticeDetailSave.actions;

// Notice에 관한 redux로 현재 ManagerAdvice에서 사용되고 있음
