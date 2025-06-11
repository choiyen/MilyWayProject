import { createSlice } from "@reduxjs/toolkit";
const initialAdministrationData = {
    administrationDate: "",
    adminstrationType: "휴일",
};
const Administration = createSlice({
    name: "setAdministrationData",
    initialState: { value: initialAdministrationData },
    reducers: {
        setAdministrationData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default Administration.reducer;
export const { setAdministrationData } = Administration.actions;
///현재 Mangager 페이지에 적용 완료
