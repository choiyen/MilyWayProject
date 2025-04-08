import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InqurieType {
  InqurieId?: string;
  Address: string;
  PhoneNumber: string;
  Inqurie: string;
  SubmissionDate: string;
}

const initialInqurieValue: InqurieType = {
  Address: "",
  PhoneNumber: "",
  Inqurie: "",
  SubmissionDate: "",
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
