import "./App.css";
// import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import { ManagerMain } from "./Components/page/MangerPage/ManagerMain";
import { ManagerAdvice } from "./Components/page/MangerPage/ManagerAdvice";
import { ManagerQuestion } from "./Components/page/MangerPage/ManagerQuestion";
import { GateWayType } from "./types/GateWayType";
import { ManagerAddress } from "./Components/page/MangerPage/ManagerAddress";
import { ManagerJoin } from "./Components/page/MangerPage/ManagerJoin";
import { ManagerCalendar } from "./Components/page/MangerPage/ManagerCalendar";
import { Provider } from "react-redux";
import store from "./DefaultRedux/reduxstore";
import { ManagerSignUp } from "./Components/page/MangerPage/ManagerSignUp";
import { ManagerAfterService } from "./Components/page/MangerPage/ManagerAfterService";
import { ManagerNotFoundPage } from "./Components/page/MangerPage/ManagerNotFoundPage";
import { ManagerAdviceSelect } from "./Components/page/MangerPage/ManagerAdviceSelect";
import { ManagerQuestionSelect } from "./Components/page/MangerPage/ManagerQuestionSelect";
import ManagerAdviceedit from "./Components/page/MangerPage/ManagerAdviceedit";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path={GateWayType.ManagerAddress}
              element={<ManagerAddress />}
            />
            <Route
              path={GateWayType.ManagerAdvice}
              element={<ManagerAdvice />}
            />
            <Route
              path={GateWayType.ManagerAdviceSelect}
              element={<ManagerAdviceSelect />}
            />
            <Route
              path={GateWayType.ManagerAfter}
              element={<ManagerAfterService />}
            />

            <Route path={GateWayType.ManagerMain} element={<ManagerMain />} />
            <Route
              path={GateWayType.ManagerQuestionSelect}
              element={<ManagerQuestionSelect />}
            />
            <Route
              path={GateWayType.ManagerQuestion}
              element={<ManagerQuestion />}
            />
            <Route path={GateWayType.ManagerJoin} element={<ManagerJoin />} />
            <Route
              path={GateWayType.ManagerSignUp}
              element={<ManagerSignUp />}
            />
            <Route
              path={GateWayType.ManagerCalendar}
              element={<ManagerCalendar />}
            />
            <Route
              path={GateWayType.ManagerAdviceedit}
              element={<ManagerAdviceedit />}
            />

            <Route path="*" element={<ManagerNotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
