import "./App.css";
import { Provider } from "react-redux";
import store from "./DefaultRedux/reduxstore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ManagerMain } from "./Components/page/MangerPage/ManagerMain";
import { ManagerAdvice } from "./Components/page/MangerPage/ManagerAdvice";
import { ManagerQuestion } from "./Components/page/MangerPage/ManagerQuestion";
import { ManagerAddress } from "./Components/page/MangerPage/ManagerAddress";
import { ManagerJoin } from "./Components/page/MangerPage/ManagerJoin";
import { ManagerCalendar } from "./Components/page/MangerPage/ManagerCalendar";
import { ManagerSignUp } from "./Components/page/MangerPage/ManagerSignUp";
import { ManagerNotFoundPage } from "./Components/page/MangerPage/ManagerNotFoundPage";
import { ManagerAdviceSelect } from "./Components/page/MangerPage/ManagerAdviceSelect";
import { ManagerQuestionSelect } from "./Components/page/MangerPage/ManagerQuestionSelect";
import ManagerAdviceedit from "./Components/page/MangerPage/ManagerAdviceedit";
import { ManagerCommonPage } from "./Components/page/ManagerComonPage";
import {
  ClientGateWayType,
  GateWayNumber,
  ManagerGateWayType,
} from "./types/GateWay/GateWayType";

const router = createBrowserRouter([
  {
    path: "/Manager",
    element: <ManagerCommonPage />,
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
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  },
  {
    path: GateWayNumber.Client,
    element: <ManagerCommonPage />,
    children: [
      {
        path: ClientGateWayType.home,
        element: <ManagerMain />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};

export default App;
