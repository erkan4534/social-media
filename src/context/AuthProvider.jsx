import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import { userData } from "../data/userData";

const initial = {
  password: "",
  email: "",
};

const AuthProvider = ({ children }) => {
  useEffect(() => {
    if (user) {
      console.log("Güncellenmiş user değeri:", user);
    }
  }, [user]);

  const [user, setUser] = useState(initial);

  function findUser(userInfo) {
    const userDetailData = userData.find(
      (usr) =>
        usr.password === userInfo.password && usr.email === userInfo.email
    );

    if (userDetailData) {
      setUser(userDetailData);
    } else {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, findUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
