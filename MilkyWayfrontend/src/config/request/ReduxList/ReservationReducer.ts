import { ReservationType } from "@/types/Feature/Address/Reservation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialReservationValue: ReservationType = {
  acreage: "",
  name: "",
  phone: "",
  Address: "",
  SubssionDate: "",
  usableArea: "",
};

export const ReservationSlice = createSlice({
  name: "SaveReservationData",
  initialState: { value: initialReservationValue },
  reducers: {
    setReservationData: (state, action: PayloadAction<ReservationType>) => {
      state.value = action.payload;
    },
  },
});

export default ReservationSlice.reducer;
export const { setReservationData } = ReservationSlice.actions;
