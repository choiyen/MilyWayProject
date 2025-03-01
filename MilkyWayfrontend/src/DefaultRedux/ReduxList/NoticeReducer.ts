import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {validate} from 'webpack';
import {setQuestionData} from './QusetionsReducer';

interface Notice {
  NoticeId: String;
  type: String;
  greeting: String;
}


const initialNoticeStateValue: Notice = {
  NoticeId: '',
  type: '',
  greeting: '',
};



export const NoticeSave = createSlice({
  name: 'setNoticeData',
  initialState: {value: initialNoticeStateValue},
  reducers: {
    setNoticeData: (state, action: PayloadAction<Notice>) => {
      state.value = action.payload;
    },
  },
});

