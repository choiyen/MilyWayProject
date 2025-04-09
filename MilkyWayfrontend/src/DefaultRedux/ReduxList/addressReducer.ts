import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addressState {
  AddressId?: string;
  customer: string;
  Address: string;
  phoneNumber: string;
  SubmissionDate: string;
  acreage?: string;
}

const initialAddressStateValue: addressState = {
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

// Address에 관한 redux로 현재 ManagerAddress에서 사용되고 있음
