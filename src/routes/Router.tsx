import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";

import App from "../App";
import Root from "./Root";
import { Dashboard } from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
]);
