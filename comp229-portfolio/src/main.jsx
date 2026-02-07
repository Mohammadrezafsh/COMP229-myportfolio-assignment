/*
 * File: main.jsx
 * Purpose: Application entry point - renders React app to DOM
 * Features: Wraps app in BrowserRouter for client-side routing
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
