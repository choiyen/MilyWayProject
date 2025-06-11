import { createSlice } from "@reduxjs/toolkit";
const initialBoardValue = {
    title: "",
    content: "",
    password: "",
};
export const setBoarding = createSlice({
    name: "SetBoardData",
    initialState: { value: initialBoardValue },
    reducers: {
        setBoardData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default setBoarding.reducer;
export const { setBoardData } = setBoarding.actions;
