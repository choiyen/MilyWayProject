import { BoardType } from "@/types/Feature/Boards/Board";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialBoardValue: BoardType = {
  title: "",
  content: "",
  password: "",
};

export const setBoarding = createSlice({
  name: "SetBoardData",
  initialState: { value: initialBoardValue },
  reducers: {
    setBoardData: (state, action: PayloadAction<BoardType>) => {
      state.value = action.payload;
    },
  },
});

export default setBoarding.reducer;
export const { setBoardData } = setBoarding.actions;
