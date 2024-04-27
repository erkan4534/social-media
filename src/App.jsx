import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { MainRoutes } from "./routes/MainRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { useEffect } from "react";

function App() {
  const router = createBrowserRouter([...MainRoutes, ...AdminRoutes]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
