import "./App.css";
// import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import { MaingerMain } from "./Componments/page/MangerPage/MangerMain";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MaingerMain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
