import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import { userData } from "../data/userData";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginInValidMessage, setIsLoginInValidMessage] = useState(false);
  const [userDataArray, setUserDataArray] = useState(userData);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  function findUser(userInfo) {
    const userDetailData = userDataArray.find(
      (usr) =>
        usr.password === userInfo.password && usr.email === userInfo.email
    );

    setUser(userDetailData);
    if (userDetailData) {
      setIsLoggedIn(true);
      setIsLoginInValidMessage(false);
    } else {
      setIsLoginInValidMessage(true);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        findUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoginInValidMessage,
        setIsLoginInValidMessage,
        userDataArray,
        setUserDataArray,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
