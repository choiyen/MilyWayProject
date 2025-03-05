import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface addressState {
  AddressId: string;
  customer: string;
  Address: string;
  phoneNumber: string;
  SubmissionDate: string;
}

const initialAddressStateValue: addressState = {
  AddressId: "",
  customer: "",
  Address: "",
  phoneNumber: "",
  SubmissionDate: "",
};

export const addressreducer = createSlice({
  name: "addressreducer",
  initialState: { value: initialAddressStateValue },
  reducers: {
    setAddressData: (state, action: PayloadAction<addressState>) => {
      state.value = action.payload;
    },
  },
});

export default addressreducer.reducer;
export const { setAddressData } = addressreducer.actions;
