export const login = (userInfo) => {
  return {
    type: "LOGIN",
    payload: userInfo,
  };
};

export const logout = (userInfo) => {
  return {
    type: "LOGOUT",
    payload: userInfo,
  };
};

export const setUser = (userInfo) => {
  return {
    type: "SET_USER",
    payload: userInfo,
  };
};
