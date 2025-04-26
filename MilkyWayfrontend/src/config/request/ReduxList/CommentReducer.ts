import { CommentValueType } from "@/types/Feature/Boards/Comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCommentValue: CommentValueType = {
  boardId: "",
  type: "",
  comment: "",
};

export const SetCommentValue = createSlice({
  name: "SetCommentData",
  initialState: { value: initialCommentValue },
  reducers: {
    setCommentData: (state, action: PayloadAction<CommentValueType>) => {
      state.value = action.payload;
    },
  },
});

export default SetCommentValue.reducer;
export const { setCommentData } = SetCommentValue.actions;
