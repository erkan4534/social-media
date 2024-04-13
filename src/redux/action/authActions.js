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

export const setUserLike = (post, userId) => {
  return {
    type: "SET_USER_LIKE",
    payload: { post, userId },
  };
};

export const removeFriend = (userId, user) => {
  return {
    type: "REMOVE_FRIEND",
    payload: { userId, user },
  };
};

export const removeUserPostAndAllPost = (allPosts, userPosts, userId) => {
  return {
    type: "REMOVE_USER_POST_AND_ALL_POST",
    payload: { allPosts, userPosts, userId },
  };
};

export const removeAllPost = (allPosts) => {
  return {
    type: "REMOVE_ALL_POST",
    payload: allPosts,
  };
};

export const postComment = (comment, post) => {
  return {
    type: "POST_COMMENT",
    payload: { comment, post },
  };
};

export const postEditComment = (post) => {
  return {
    type: "POST_EDIT_COMMENT",
    payload: post,
  };
};
