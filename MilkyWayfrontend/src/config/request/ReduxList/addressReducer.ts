import { AddressType } from "@/types/Feature/Address/AddressType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialAddressStateValue: AddressType = {
  customer: "",
  Address: "",
  phoneNumber: "",
  SubmissionDate: "",
};

export const addressreducer = createSlice({
  name: "addressreducer",
  initialState: { value: initialAddressStateValue },
  reducers: {
    setAddressData: (state, action: PayloadAction<AddressType>) => {
      state.value = action.payload;
    },
  },
});

export default addressreducer.reducer;
export const { setAddressData } = addressreducer.actions;

// Address에 관한 redux로 현재 ManagerAddress에서 사용되고 있음
