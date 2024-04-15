import MainLayout from "../layouts/layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";

export const MainRoutes = [
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
    ],
  },
];
