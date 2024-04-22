import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export const AdminLayout = () => {
  return (
    <div>
      <Header isAdmin={true} />
      <Outlet context={{ isAdmin: true }} />
    </div>
  );
};

export default AdminLayout;
