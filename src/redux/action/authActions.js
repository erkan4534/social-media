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

export const addNewFriend = (userInfo) => {
  return {
    type: "ADD_NEW_FIREND",
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

export const removeFriend = (userId, user) => {
  return {
    type: "REMOVE_FRIEND",
    payload: { userId, user },
  };
};

export const removeUserPost = (posts, userId) => {
  return {
    type: "REMOVE_USER_POST",
    payload: { posts, userId },
  };
};
