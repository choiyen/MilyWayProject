import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {act} from 'react';

interface addressState {
  AddressId: String;
  customer: String;
  Address: String;
  phoneNumber: String;
  SubmissionDate: String;
}

const initialAddressStateValue: addressState = {
  AddressId: '',
  customer: '',
  Address: '',
  phoneNumber: '',
  SubmissionDate: '',
};

export const addressreducer = createSlice({
  name: 'addressreducer',
  initialState: {value: initialAddressStateValue},
  reducers: {
    setAddressData: (state, action: PayloadAction<addressState>) => {
      state.value = action.payload;
    },
  },
});

export default addressreducer.reducer;
export const {setAddressData} = addressreducer.actions;
