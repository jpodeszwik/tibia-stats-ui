import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Guild from "./Guild";
import "./index.css";
import SearchGuild from "./SearchGuild";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchGuild />,
  },
  {
    path: "/guild/:guildName",
    element: <Guild />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
