import { ManagerCommonPage } from "@/Components/Common/layouts/ManagerComonPage";
import "./App.css";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ManagerAddress } from "@/Components/page/ManagerPage/Address/Components/ManagerAddress";
import {
  ClientGateWayType,
  ManagerGateWayType,
} from "@/types/GateWay/GateWayType";
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
import { ThemeProvider } from "styled-components";
import { theme } from "@/SCSS/typecss";
import { GlobalSwalStyle } from "./AppToast";
import ManagerInquires from "@/Components/page/ManagerPage/Inquires/ManagerInquires";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Client/home" replace />,
  },
  {
    path: "/Manager",
    element: <ManagerCommonPage />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: ManagerGateWayType.Address,
        element: <ManagerAddress />,
      },
      {
        path: ManagerGateWayType.Advice,
        element: <ManagerAdvice />,
      },
      {
        path: ManagerGateWayType.AdviceSelect,
        element: <ManagerAdviceSelect />,
      },
      {
        path: ManagerGateWayType.Main,
        element: <ManagerMain />,
      },
      {
        path: ManagerGateWayType.QuestionSelect,
        element: <ManagerQuestionSelect />,
      },
      {
        path: ManagerGateWayType.Question,
        element: <ManagerQuestion />,
      },
      {
        path: ManagerGateWayType.Join,
        element: <ManagerJoin />,
      },
      {
        path: ManagerGateWayType.SignUp,
        element: <ManagerSignUp />,
      },
      {
        path: ManagerGateWayType.Calendar,
        element: <ManagerCalendar />,
      },
      {
        path: ManagerGateWayType.Adviceedit,
        element: <ManagerAdviceedit />,
      },
      {
        path: ManagerGateWayType.Inquires,
        element: <ManagerInquires />, // Assuming this is the correct component for Inquires
      },
      {
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  },
  {
    path: "/Client",
    element: <ClientComonPage />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: ClientGateWayType.home,
        element: <MainPage />,
      },
      {
        path: ClientGateWayType.Reservation,
        element: <ClientReservation />,
      },
      {
        path: ClientGateWayType.Info,
        element: <ServiceIntroduction />,
      },
      {
        path: ClientGateWayType.Service,
        element: <ServiceProFile />,
      },
      {
        path: ClientGateWayType.Question,
        element: <ClientQuestion />,
      },
      {
        path: ClientGateWayType.ServiceInsert,
        element: <ServiceInsert />,
      },
      {
        path: ClientGateWayType.Serviceedit,
        element: <ServiceBoard />,
      },
      {
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ManagerCommonPage />,
    children: [
      {
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  }, // 클라이언트 쪽 페이지로 변경되어 함
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalSwalStyle /> {/* 여기 넣기 */}
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
