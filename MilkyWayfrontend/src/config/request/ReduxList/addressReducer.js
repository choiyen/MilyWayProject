import { createSlice } from "@reduxjs/toolkit";
const initialAddressStateValue = {
    customer: "",
    address: "",
    phoneNumber: "",
    submissionDate: `${new Date().toISOString().split("T")[0]}`,
    acreage: "",
    cleanType: "주거청소",
    addressId: "",
};
export const addressreducer = createSlice({
    name: "addressreducer",
    initialState: { value: initialAddressStateValue },
    reducers: {
        setAddressData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default addressreducer.reducer;
export const { setAddressData } = addressreducer.actions;
// Address에 관한 redux로 현재 ManagerAddress에서 사용되고 있음
