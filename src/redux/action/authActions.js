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

export const setUserDataArray = (userData) => {
  return {
    type: "SET_USER_DATA_ARRAY",
    payload: userData,
  };
};

export const setUserPost = (userPost) => {
  return {
    type: "SET_USER_POST",
    payload: userPost,
  };
};

export const setUserLike = (post) => {
  return {
    type: "SET_USER_LIKE",
    payload: post,
  };
};

export const removeUser = (userData) => {
  return {
    type: "REMOVE_USER",
    payload: userData,
  };
};

export const removeUserPost = (post) => {
  return {
    type: "REMOVE_USER_POST",
    payload: post,
  };
};
