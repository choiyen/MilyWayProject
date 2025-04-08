import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AdministrationType {
  administrationId?: string;
  administrationDate: Date;
  administrationType: string;
}

const initialAdministrationData: AdministrationType = {
  administrationDate: new Date(),
  administrationType: "",
};

const Administration = createSlice({
  name: "setAdministrationData",
  initialState: { value: initialAdministrationData },
  reducers: {
    setAdministrationData: (
      state,
      action: PayloadAction<AdministrationType>
    ) => {
      state.value = action.payload;
    },
  },
});

export default Administration.reducer;
export const { setAdministrationData } = Administration.actions;

// 데이터 추가를 위한 리듀서 설정완료
