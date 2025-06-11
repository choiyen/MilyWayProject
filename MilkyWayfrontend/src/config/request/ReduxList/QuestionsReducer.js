import { createSlice } from "@reduxjs/toolkit";
const initialQuestionValue = [
    {
        exceptionQA: "",
        expectedComment: "",
    },
];
export const SaveQuestionData = createSlice({
    name: "SaveQuestionData",
    initialState: { value: initialQuestionValue },
    reducers: {
        setQuestionData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default SaveQuestionData.reducer;
export const { setQuestionData } = SaveQuestionData.actions;
// 현재 ManagerQuestion.tsx에서 사용하고 있는 QuestionReducer.ts입니다.
