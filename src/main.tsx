import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Guild from "./Guild";
import "./index.css";
import Root from "./Root";
import Deaths from "./Deaths";
import Activity from "./Activity";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/guild/:guildName" element={<Guild />}>
          <Route path="deaths" element={<Deaths />} />
          <Route path="activity" element={<Activity />} />
          <Route index element={<Navigate to="deaths" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
