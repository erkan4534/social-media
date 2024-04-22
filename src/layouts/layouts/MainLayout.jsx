import { useState } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isAdmin={false}
      />
      <Outlet context={{ searchTerm }} />
    </div>
  );
};

export default MainLayout;
