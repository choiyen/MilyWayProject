import { AdministrationType } from "@/types/Feature/Address/Adminstration";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

///현재 Mangager 페이지에 적용 완료
