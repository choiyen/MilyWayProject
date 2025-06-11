import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ManagerCommonPage } from "@/Components/Common/layouts/ManagerComonPage";
import "./App.css";
import { Provider } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider, } from "react-router-dom";
import { ManagerAddress } from "@/Components/page/ManagerPage/Address/Components/ManagerAddress";
import { ClientGateWayType, ManagerGateWayType, } from "@/types/GateWay/GateWayType";
import { ManagerAdvice } from "@/Components/page/ManagerPage/Advice/ManagerAdvice";
import { ManagerAdviceSelect } from "@/Components/page/ManagerPage/Advice/ManagerAdviceSelect";
import { ManagerMain } from "@/Components/page/ManagerPage/Connected/ManagerMain";
import { ManagerJoin } from "@/Components/page/ManagerPage/Address/Components/ManagerJoin";
import ManagerAdviceedit from "@/Components/page/ManagerPage/Advice/ManagerAdviceedit";
import { ManagerCalendar } from "@/Components/page/ManagerPage/Calendar/Components/ManagerCalendar";
import { ManagerNotFoundPage } from "@/Components/page/ManagerPage/NotFound/ManagerNotFoundPage";
import { ManagerSignUp } from "@/Components/page/ManagerPage/Connected/ManagerSignUp";
import { ManagerQuestion } from "@/Components/page/ManagerPage/Question/ManagerQuestion";
import { ManagerQuestionSelect } from "@/Components/page/ManagerPage/Question/ManagerQuestionSelect";
import store from "@/config/reduxstore";
import GlobalErrorBoundary from "@/Components/Common/errors/GlobalErrorBoundary";
import { ClientComonPage } from "@/Components/Common/layouts/ClientComonPage";
import { MainPage } from "@/Components/page/ClientPage/Main/MainPage";
import ServiceProFile from "@/Components/page/ClientPage/Service/ServiceProFile";
import ServiceIntroduction from "@/Components/page/ClientPage/Introduction/ServiceIntroduction";
import { ClientQuestion } from "@/Components/page/ClientPage/Question/page/ClientQuestion";
import ServiceInsert from "@/Components/page/ClientPage/Question/Board/ServiceInsert";
import ServiceBoard from "@/Components/page/ClientPage/Question/Board/ServiceBoard";
import { ClientReservation } from "@/Components/page/ClientPage/Reservation/ClientReservation";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "@/SCSS/typecss";
import { GlobalSwalStyle } from "./AppToast";
import ManagerInquires from "@/Components/page/ManagerPage/Inquires/ManagerInquires";
import { ToastContainer } from "react-toastify";
import ManagerInquiresSelect from "@/Components/page/ManagerPage/Inquires/ManagerInquiresSelect";
import ServiceDetail from "@/Components/page/ClientPage/Service/ServiceDetail";
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(Navigate, { to: "/Client/home", replace: true }),
    },
    {
        path: "/Manager",
        element: _jsx(ManagerCommonPage, {}),
        errorElement: _jsx(GlobalErrorBoundary, {}),
        children: [
            {
                path: ManagerGateWayType.Address,
                element: _jsx(ManagerAddress, {}),
            },
            {
                path: ManagerGateWayType.Advice,
                element: _jsx(ManagerAdvice, {}),
            },
            {
                path: ManagerGateWayType.AdviceSelect,
                element: _jsx(ManagerAdviceSelect, {}),
            },
            {
                path: ManagerGateWayType.Main,
                element: _jsx(ManagerMain, {}),
            },
            {
                path: ManagerGateWayType.QuestionSelect,
                element: _jsx(ManagerQuestionSelect, {}),
            },
            {
                path: ManagerGateWayType.Question,
                element: _jsx(ManagerQuestion, {}),
            },
            {
                path: ManagerGateWayType.Join,
                element: _jsx(ManagerJoin, {}),
            },
            {
                path: ManagerGateWayType.SignUp,
                element: _jsx(ManagerSignUp, {}),
            },
            {
                path: ManagerGateWayType.Calendar,
                element: _jsx(ManagerCalendar, {}),
            },
            {
                path: ManagerGateWayType.Adviceedit,
                element: _jsx(ManagerAdviceedit, {}),
            },
            {
                path: ManagerGateWayType.Inquires,
                element: _jsx(ManagerInquires, {}), // Assuming this is the correct component for Inquires
            },
            {
                path: ManagerGateWayType.Inquireedit,
                element: _jsx(ManagerInquiresSelect, {}), // Assuming this is the correct component for Inquire edit
            },
            {
                path: "*",
                element: _jsx(ManagerNotFoundPage, {}),
            },
        ],
    },
    {
        path: "/Client",
        element: _jsx(ClientComonPage, {}),
        errorElement: _jsx(GlobalErrorBoundary, {}),
        children: [
            {
                path: ClientGateWayType.home,
                element: _jsx(MainPage, {}),
            },
            {
                path: ClientGateWayType.Reservation,
                element: _jsx(ClientReservation, {}),
            },
            {
                path: ClientGateWayType.Info,
                element: _jsx(ServiceIntroduction, {}),
            },
            {
                path: ClientGateWayType.Service,
                element: _jsx(ServiceProFile, {}),
            },
            {
                path: ClientGateWayType.Question,
                element: _jsx(ClientQuestion, {}),
            },
            {
                path: ClientGateWayType.Boardedit,
                element: _jsx(ServiceBoard, {}),
            },
            {
                path: ClientGateWayType.ServiceInsert,
                element: _jsx(ServiceInsert, {}),
            },
            {
                path: ClientGateWayType.ServiceDetail,
                element: _jsx(ServiceDetail, {}), // Assuming this is the correct component for Service Detail
            },
            {
                path: "*",
                element: _jsx(ManagerNotFoundPage, {}),
            },
        ],
    },
    {
        path: "*",
        element: _jsx(ManagerCommonPage, {}),
        children: [
            {
                path: "*",
                element: _jsx(ManagerNotFoundPage, {}),
            },
        ],
    }, // 클라이언트 쪽 페이지로 변경되어 함
]);
const GlobalStyle = createGlobalStyle `
  body, body * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  input, textarea, select, [contenteditable="true"] {
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
  }
`;
const App = () => {
    return (_jsx(ThemeProvider, { theme: theme, children: _jsxs(Provider, { store: store, children: [_jsx(GlobalSwalStyle, {}), " ", _jsx(GlobalStyle, {}), _jsx(ToastContainer, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, toastClassName: "custom-toast", className: "custom-toast-body" }), _jsx("div", { className: "App", children: _jsx(RouterProvider, { router: router }) })] }) }));
};
export default App;
