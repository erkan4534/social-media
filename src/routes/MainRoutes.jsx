import MainLayout from "../layouts/layouts/MainLayout";
import { Admin } from "../pages/Admin/Admin";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";

export const MainRoutes = [
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage isAdmin={false} />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
    ],
  },

  {
    path: "admin",
    element: <Admin />,
  },
];
