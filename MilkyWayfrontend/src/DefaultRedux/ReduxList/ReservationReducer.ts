import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Reservation {
  reservationId?: string;
  acreage: string;
  name: string;
  phone: string;
  Address: string;
  SubssionDate: string;
}

const initialReservationValue: Reservation = {
  acreage: "",
  name: "",
  phone: "",
  Address: "",
  SubssionDate: "",
};

export const ReservationSlice = createSlice({
  name: "SaveReservationData",
  initialState: { value: initialReservationValue },
  reducers: {
    setReservationData: (state, action: PayloadAction<Reservation>) => {
      state.value = action.payload;
    },
  },
});

export default ReservationSlice.reducer;
export const { setReservationData } = ReservationSlice.actions;
