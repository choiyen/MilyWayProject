import "./App.css";
// import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import { ManagerMain } from "./Components/page/MangerPage/ManagerMain";
import { ManagerAdvice } from "./Components/page/MangerPage/MangerAdvice";
import { ManagerQuestion } from "./Components/page/MangerPage/ManagerQuestion";
import { GateWayType } from "./types/GateWayType";
import { ManagerSign } from "./Components/page/MangerPage/ManagerSign";
import { ManagerJoin } from "./Components/page/MangerPage/ManagerJoin";
import { ManagerCalendar } from "./Components/page/MangerPage/ManagerCalendar";
import { Provider } from "react-redux";
import store from "./DefaultRedux/reduxstore";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={GateWayType.ManagerMain} element={<ManagerMain />} />
            <Route
              path={GateWayType.ManagerAdvice}
              element={<ManagerAdvice />}
            />
            <Route
              path={GateWayType.ManagerQuestion}
              element={<ManagerQuestion />}
            />
            <Route path={GateWayType.ManagerSign} element={<ManagerSign />} />
            <Route path={GateWayType.ManagerJoin} element={<ManagerJoin />} />
            <Route
              path={GateWayType.ManagerCalendar}
              element={<ManagerCalendar />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
