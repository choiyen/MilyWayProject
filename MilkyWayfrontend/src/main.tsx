import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./SCSS/index.scss";
import reduxstore from "./DefaultRedux/reduxstore";
import { Provider } from "react-redux";
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
  console.error("Root element not found");
}
