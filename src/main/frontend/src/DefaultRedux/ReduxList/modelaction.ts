import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {act} from 'react';

interface modelSlice {
  value: boolean;
}

const initialStateValue: modelSlice = {
  value: false,
};
export const modelSlice = createSlice({
  name: 'modelaction',
  initialState: {value: initialStateValue},
  reducers: {
    setmodelactionData: (state, action: PayloadAction<modelSlice>) => {
      state.value = action.payload;
    },
  },
});

export default modelSlice.reducer;
export const {setmodelactionData} = modelSlice.actions;
