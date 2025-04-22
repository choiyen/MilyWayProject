import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardType } from "@/types/Feature/ProjectDataType";

const initialBoardValue: BoardType = {
  title: "",
  content: "",
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
