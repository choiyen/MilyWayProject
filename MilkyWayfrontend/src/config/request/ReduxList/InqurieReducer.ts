import { InqurieType } from "@/types/Feature/Inqurie/Inqurie";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialInqurieValue: InqurieType = {
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
    setIqurieData: (state, action: PayloadAction<InqurieType>) => {
      state.value = action.payload;
    },
  },
});

export default InqurleValue.reducer;
export const { setIqurieData } = InqurleValue.actions;
