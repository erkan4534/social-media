import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  useEffect(() => {
    const rootElement = document.documentElement;
    if (location.pathname === "/home") {
      rootElement.style.overflow = "hidden";
    } else {
      rootElement.style.overflow = "auto";
    }
    return () => {
      rootElement.style.overflow = "auto";
    };
  }, [location]);

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
