import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Connection, initializeContext } from "./contexts/connection";
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Connection.Provider value={initializeContext()}>
      <App />
    </Connection.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
