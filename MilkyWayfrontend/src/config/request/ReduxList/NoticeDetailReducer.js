import { createSlice } from "@reduxjs/toolkit";
const initialNoticeDetailStateValue = [
    {
        NoticeId: "",
        direction: "",
        beforeURL: [],
        afterURL: [],
        comment: "",
    },
];
export const NoticeDetailSave = createSlice({
    name: "setNoticeDetailData",
    initialState: { value: initialNoticeDetailStateValue },
    reducers: {
        setNoticeDetailData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export default NoticeDetailSave.reducer;
export const { setNoticeDetailData } = NoticeDetailSave.actions;
// Notice에 관한 redux로 현재 ManagerAdvice에서 사용되고 있음
