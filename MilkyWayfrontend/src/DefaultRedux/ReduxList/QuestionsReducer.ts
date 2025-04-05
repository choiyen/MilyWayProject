import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  questionId: string;
  ExpectionQnA: string;
  ExpectedComment: string;
}

const initialQuestionValue: Question[] = [
  {
    questionId: "",
    ExpectedComment: "",
    ExpectionQnA: "",
  },
];

export const SaveQuestionData = createSlice({
  name: "SaveQuestionData",
  initialState: { value: initialQuestionValue },
  reducers: {
    setQuestionData: (state, action: PayloadAction<Question[]>) => {
      state.value = action.payload;
    },
  },
});

export default SaveQuestionData.reducer;
export const { setQuestionData } = SaveQuestionData.actions;
