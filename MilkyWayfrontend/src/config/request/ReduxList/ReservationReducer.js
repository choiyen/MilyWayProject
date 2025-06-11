import { createSlice } from "@reduxjs/toolkit";
const initialReservationValue = {
    acreage: "",
    name: "",
    phone: "",
    Address: "",
    SubssionDate: "",
    type: "",
};
export const ReservationSlice = createSlice({
    name: "SaveReservationData",
    initialState: { value: initialReservationValue },
    reducers: {
        setReservationData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default ReservationSlice.reducer;
export const { setReservationData } = ReservationSlice.actions;
