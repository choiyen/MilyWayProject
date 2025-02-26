import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface NoticeDetail {
  NoticeDetailId: String;
  NoticeId: String;
  direction: String;
  beforeURL: String[];
  afterURL: String[];
}

const initialNoticeDetailStateValue: NoticeDetail = {
  NoticeDetailId: '',
  NoticeId: '',
  direction: '',
  beforeURL: [],
  afterURL: [],
};
export const NoticeDetailSave = createSlice({
  name: 'setNoticeDetailData',
  initialState: {value: initialNoticeDetailStateValue},
  reducers: {
    setNoticeData: (state, action: PayloadAction<NoticeDetail>) => {
      state.value = action.payload;
    },
  },
});

export default NoticeDetailSave.reducer;
export const {setNoticeData} = NoticeDetailSave.actions;
