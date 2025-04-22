import "./App.css";
import { Provider } from "react-redux";
import store from "./DefaultRedux/reduxstore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GateWayType } from "./types/GateWay/GateWayType";

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

const router = createBrowserRouter([
  {
    path: "/Manager",
    element: <ManagerCommonPage />,
    children: [
      {
        path: GateWayType.ManagerAddress,
        element: <ManagerAddress />,
      },
      {
        path: GateWayType.ManagerAdvice,
        element: <ManagerAdvice />,
      },
      {
        path: GateWayType.ManagerAdviceSelect,
        element: <ManagerAdviceSelect />,
      },
      {
        path: GateWayType.ManagerMain,
        element: <ManagerMain />,
      },
      {
        path: GateWayType.ManagerMain,
        element: <ManagerMain />,
      },
      {
        path: GateWayType.ManagerQuestionSelect,
        element: <ManagerQuestionSelect />,
      },
      {
        path: GateWayType.ManagerQuestion,
        element: <ManagerQuestion />,
      },
      {
        path: GateWayType.ManagerJoin,
        element: <ManagerJoin />,
      },
      {
        path: GateWayType.ManagerSignUp,
        element: <ManagerSignUp />,
      },
      {
        path: GateWayType.ManagerCalendar,
        element: <ManagerCalendar />,
      },
      {
        path: GateWayType.ManagerAdviceedit,
        element: <ManagerAdviceedit />,
      },
      {
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  },
  {
    path: "/Client",
    element: <ManagerCommonPage />,
    children: [
      {
        path: GateWayType.MainPage,
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
