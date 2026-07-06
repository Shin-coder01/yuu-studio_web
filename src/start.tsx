import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { getRouter } from "./router";

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
