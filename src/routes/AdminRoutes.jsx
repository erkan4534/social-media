import { Admin } from "../pages/Admin/Admin";
import AdminLayout from "../layouts/layouts/AdminLayout";
import ErrorPage from "../pages/Error/ErrorPage";

export const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
    ],
  },
];
