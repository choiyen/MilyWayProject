import "./App.css";
// import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import { MaingerMain } from "./Components/page/MangerPage/MangerMain";
import { ManagerAdvice } from "./Components/page/MangerPage/MangerAdvice";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Manger/Login" element={<MaingerMain />} />
          <Route path="/Manger/Advice" element={<ManagerAdvice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
