import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Header from "./components/Header"; // Ensure this path is correct
import TemplateDashboard from "./TemplateDashboard"; // Ensure this path is correct
import Templates from "./Templates";

ReactDOM.render(
  <BrowserRouter>
    <Header /> {/* This will be displayed on every page */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Templates" element={<Templates />} />
      <Route path="/template/portfolio" element={<TemplateDashboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
