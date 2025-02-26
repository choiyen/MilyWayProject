import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface BoardType {
  boardId: String;
  title: String;
  content: String;
}

const initialBoardValue: BoardType = {
  boardId: '',
  title: '',
  content: '',
};

export const setBoarding = createSlice({
  name: 'SetBoardData',
  initialState: {value: initialBoardValue},
  reducers: {
    setBoardData: (state, action) => {
      state.value = action.payload;
    },
  },
});
