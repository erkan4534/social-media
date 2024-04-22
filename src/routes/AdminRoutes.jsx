import { Admin } from "../pages/Admin/Admin";
import AdminLayout from "../layouts/layouts/AdminLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Profile from "../pages/Profile/Profile";

export const AdminRoutes = [
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
    ],
  },
];
