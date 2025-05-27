import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/SCSS/index.scss";
// import "./index.css";
import { Provider } from "react-redux";
import reduxstore from "@/config/reduxstore";
import Swal from "sweetalert2";
const rootElement = document.getElementById("root");

if (rootElement) {
  // rootElement가 null이 아닌 경우에만 실행
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={reduxstore}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  Swal.fire({
    icon: "error",
    title: "오류",
    text: "애플리케이션을 시작할 수 없습니다. 루트 요소를 찾을 수 없습니다.",
  });
}
