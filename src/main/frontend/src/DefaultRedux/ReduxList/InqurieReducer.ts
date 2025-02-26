import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface InqurieType {
  InqurieId: String;
  Address: String;
  PhoneNumber: String;
  Inqurie: String;
  SubmissionDate: String;
}

const initialInqurieValue: InqurieType = {
  InqurieId: '',
  Address: '',
  PhoneNumber: '',
  Inqurie: '',
  SubmissionDate: '',
};

export const InqurleValue = createSlice({
  name: 'setInqurieData',
  initialState: {value: initialInqurieValue},
  reducers: {
    setIqurieData: (state, action: PayloadAction<InqurieType>) => {
      state.value = action.payload;
    },
  },
});

export default InqurleValue.reducer;
export const {setIqurieData} = InqurleValue.actions;
