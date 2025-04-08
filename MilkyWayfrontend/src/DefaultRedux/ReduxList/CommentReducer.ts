import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommentValue {
  commentId?: string;
  boardId: string;
  type: string;
  comment: string;
}

const initialCommentValue: CommentValue = {
  boardId: "",
  type: "",
  comment: "",
};

export const SetCommentValue = createSlice({
  name: "SetCommentData",
  initialState: { value: initialCommentValue },
  reducers: {
    setCommentData: (state, action: PayloadAction<CommentValue>) => {
      state.value = action.payload;
    },
  },
});

export default SetCommentValue.reducer;
export const { setCommentData } = SetCommentValue.actions;
