import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import { userData } from "../data/userData";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  function findUser(userInfo) {
    const userDetailData = userData.find(
      (usr) =>
        usr.password === userInfo.password && usr.email === userInfo.email
    );

    setUser(userDetailData);
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, findUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
