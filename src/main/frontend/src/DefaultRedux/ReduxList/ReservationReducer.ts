import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Reservation {
  reservationId: String;
  acreage: String;
  roomcount: String;
  name: String;
  phone: String;
  Address: String;
  SubssionDate: string;
}

const initialReservationValue: Reservation = {
  reservationId: '',
  acreage: '',
  roomcount: '',
  name: '',
  phone: '',
  Address: '',
  SubssionDate: '',
};

export const ReservationSlice = createSlice({
  name: 'SaveReservationData',
  initialState: {value: initialReservationValue},
  reducers: {
    setReservationData: (state, action: PayloadAction<Reservation>) => {
      state.value = action.payload;
    },
  },
});

export default ReservationSlice.reducer;
export const {setReservationData} = ReservationSlice.actions;
