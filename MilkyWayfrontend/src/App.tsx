import "./App.css";
// import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import { ManagerMain } from "./Components/page/MangerPage/ManagerMain";
import { ManagerAdvice } from "./Components/page/MangerPage/MangerAdvice";
import { ManagerQuestion } from "./Components/page/MangerPage/ManagerQuestion";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Manger/Login" element={<ManagerMain />} />
          <Route path="/Manger/Advice" element={<ManagerAdvice />} />
          <Route path="/Manger/Question" element={<ManagerQuestion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
