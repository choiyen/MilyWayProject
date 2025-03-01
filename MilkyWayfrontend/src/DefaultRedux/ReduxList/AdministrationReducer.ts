import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AdministrationType {
  administrationId: String;
  administrationData: Date;
  administrationType: String;
}

const initialAdministrationData: AdministrationType = {
  administrationData: new Date(),
  administrationId: '',
  administrationType: '',
};

const Administration = createSlice({
  name: 'setAdministrationData',
  initialState: {value: initialAdministrationData},
  reducers: {
    setAdministrationData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default Administration.reducer;
export const {setAdministrationData} = Administration.actions;
