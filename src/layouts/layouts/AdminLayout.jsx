import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useState } from "react";

export const AdminLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isAdmin={true}
      />
      <Outlet context={{ isAdmin: true, searchTerm }} />
    </div>
  );
};

export default AdminLayout;
