import "./App.css";
// import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import { ManagerMain } from "./Components/page/MangerPage/ManagerMain";
import { ManagerAdvice } from "./Components/page/MangerPage/MangerAdvice";
import { ManagerQuestion } from "./Components/page/MangerPage/ManagerQuestion";
import { GateWayType } from "./types/GateWayType";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={GateWayType.ManagerMain} element={<ManagerMain />} />
          <Route path={GateWayType.ManagerAdvice} element={<ManagerAdvice />} />
          <Route
            path={GateWayType.ManagerQuestion}
            element={<ManagerQuestion />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
