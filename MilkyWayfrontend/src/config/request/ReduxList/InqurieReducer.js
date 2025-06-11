import { createSlice } from "@reduxjs/toolkit";
const initialInqurieValue = {
    InquireName: "",
    Address: "",
    PhoneNumber: "",
    Inqurie: "",
    SubmissionDate: new Date().toISOString(),
    inquireBool: false,
};
export const InqurleValue = createSlice({
    name: "setInqurieData",
    initialState: { value: initialInqurieValue },
    reducers: {
        setIqurieData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default InqurleValue.reducer;
export const { setIqurieData } = InqurleValue.actions;
