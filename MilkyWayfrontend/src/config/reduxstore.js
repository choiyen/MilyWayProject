import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./request/ReduxList/userlogin";
import userSignReducer from "./request/ReduxList/usersign"; // userSignSlice에서 export한 reducer
import ReservationReducer from "./request/ReduxList/ReservationReducer";
import QuestionReducer from "./request/ReduxList/QuestionsReducer";
import NoticeReducer from "./request/ReduxList/NoticeReducer";
import NoticeDetailReducer from "./request/ReduxList/NoticeDetailReducer";
import InqurleReducer from "@/config/request/ReduxList/InqurieReducer";
import BoardReducer from "@/config/request/ReduxList/BoardReducer";
import AdministrationReducer from "@/config/request/ReduxList/AdministrationReducer";
import AddressReducer from "@/config/request/ReduxList/addressReducer";
import authReducer from "@/config/request/ReduxList/useauthSlice";
const store = configureStore({
    reducer: {
        userlogin: userReducer,
        usersign: userSignReducer,
        Reservation: ReservationReducer,
        Question: QuestionReducer,
        Notice: NoticeReducer,
        NoticeDetail: NoticeDetailReducer,
        Inqurle: InqurleReducer,
        Board: BoardReducer,
        Administration: AdministrationReducer,
        Address: AddressReducer,
        auth: authReducer,
    },
});
export default store;
// 스토어를 export하여 다른 컴포넌트에서 사용할 수 있도록 함
