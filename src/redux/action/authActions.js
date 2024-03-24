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
