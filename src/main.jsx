import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";

import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom"; // ✅ add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* ✅ wrap App here */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
