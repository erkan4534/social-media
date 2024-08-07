import { userData } from "../../data/userData";

const initialState = {
  user: null,
  allPosts: [],
  isLoggedIn: false,
  isLoginInValidMessage: false,
  userDataArray: userData,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN": {
      const { email, password } = action.payload;
      const userDetailData = state.userDataArray.find(
        (usr) => usr.password === password && usr.email === email
      );

      const allFriendPosts = [];
      if (userDetailData && userDetailData.role === "memberUser") {
        const friendPostDataArray =
          userDetailData &&
          state.userDataArray.filter((usr) =>
            userDetailData?.friends.includes(usr.id)
          );

        friendPostDataArray.forEach((friend) => {
          allFriendPosts.push(...friend.posts);
        });

        if (userDetailData.posts.length > 0) {
          allFriendPosts.push(...userDetailData.posts);
        }
      } else {
        state.userDataArray.forEach((member) => {
          allFriendPosts.push(...member.posts);
        });
      }

      return userDetailData
        ? {
          ...state,
          user: userDetailData,
          isLoggedIn: true,
          isLoginInValidMessage: false,
          allPosts: allFriendPosts,
        }
        : {
          ...state,
          isLoginInValidMessage: true,
        };
    }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        isLoginInValidMessage: false,
        userDataArray: userData,
        allPosts: [],
      };

    case "ADD_NEW_FIREND": {
      const updatedUserDataArray = state.userDataArray.map((usr) => {
        if (usr.id === state.user.id) {
          return { ...usr, friends: [...usr.friends, action.payload] };
        }

        return usr;
      });

      return {
        ...state,
        user: {
          ...state.user,
          friends: [...state.user.friends, action.payload],
        },

        userDataArray: updatedUserDataArray,
      };
    }
    case "SET_USER_POST": {
      const updatedUserDataArray = state.userDataArray.map((usr) => {
        if (usr.id === state.user.id) {
          return { ...usr, posts: [action.payload, ...usr.posts] };
        }

        return usr;
      });

      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts],
        user: {
          ...state.user,
          posts: [action.payload, ...state.user.posts],
        },
        userDataArray: updatedUserDataArray,
      };
    }
    case "SET_USER_LIKE": {
      const allNewPosts = state.allPosts.map((post) => {
        if (post.id === action.payload.post.id) {
          if (post.likes.find((like) => like === action.payload.userId)) {
            return {
              ...post,
              likes: post.likes.filter(
                (like) => like !== action.payload.userId
              ),
            };
          } else {
            return {
              ...post,
              likes: [...post.likes, action.payload.userId],
            };
          }
        } else {
          return post;
        }
      });

      const userDataNewArray = state.userDataArray.map((userInfo) => {
        if (userInfo.id === action.payload.post.userId) {
          const newPost = userInfo.posts.map((post) => {
            if (post.id === action.payload.post.id) {
              if (post.likes.find((like) => like === action.payload.userId)) {
                return {
                  ...post,
                  likes: post.likes.filter(
                    (like) => like !== action.payload.userId
                  ),
                };
              } else {
                return {
                  ...post,
                  likes: [...post.likes, action.payload.userId],
                };
              }
            }
            return post;
          });

          return {
            ...userInfo,
            posts: newPost,
          };
        }
        return userInfo;
      });

      return {
        ...state,
        allPosts: allNewPosts,
        userDataArray: userDataNewArray,
      };
    }

    case "SET_USER_DATA_ARRAY":
      return {
        ...state,
        userDataArray: [...state.userDataArray, action.payload],
        isLoginInValidMessage: false,
      };

    case "REMOVE_FRIEND": {
      const { userId, user } = action.payload;

      const newFriends = user.friends.filter((friendId) => friendId != userId);

      const updatedUserDataArray = state.userDataArray.map((usr) => {
        if (usr.id === user.id) {
          return { ...usr, friends: newFriends };
        }

        return usr;
      });

      if (user.id == state.user.id) {
        return {
          ...state,
          user: {
            ...state.user,
            friends: newFriends,
          },
          userDataArray: updatedUserDataArray,
        };
      } else {
        return {
          ...state,
          userDataArray: updatedUserDataArray,
        };
      }
    }

    case "REMOVE_USER_POST_AND_ALL_POST": {
      const newUserDataArray = state.userDataArray.map((usr) => {
        if (usr.id === action.payload.userId) {
          return { ...usr, posts: action.payload.userPosts };
        }
        return usr;
      });

      return {
        ...state,
        allPosts: action.payload.allPosts,
        user: {
          ...state.user,
          posts: action.payload.userPosts,
        },
        userDataArray: newUserDataArray,
      };
    }

    case "REMOVE_ALL_POST": {
      return {
        ...state,
        allPosts: action.payload,
      };
    }

    case "POST_COMMENT": {
      const allNewPosts = state.allPosts.map((post) => {
        if (post.id === action.payload.post.id) {
          return {
            ...post,
            comments: [...post.comments, action.payload.comment],
          };
        } else {
          return post;
        }
      });

      const userDataNewArray = state.userDataArray.map((userInfo) => {
        if (userInfo.id === action.payload.post.userId) {
          const newPost = userInfo.posts.map((post) => {
            if (post.id === action.payload.post.id) {
              return {
                ...post,
                comments: [...post.comments, action.payload.comment],
              };
            }
            return post;
          });

          return {
            ...userInfo,
            posts: newPost,
          };
        }
        return userInfo;
      });

      return {
        ...state,
        allPosts: allNewPosts,
        userDataArray: userDataNewArray,
      };
    }

    case "POST_EDIT_COMMENT": {
      const allNewPosts = state.allPosts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        } else {
          return post;
        }
      });

      const userDataNewArray = state.userDataArray.map((userInfo) => {
        if (userInfo.id === action.payload.userId) {
          const updatePost = userInfo.posts.map((post) => {
            if (post.id === action.payload.id) {
              return action.payload;
            }
            return post;
          });

          return {
            ...userInfo,
            posts: updatePost,
          };
        }
        return userInfo;
      });

      return {
        ...state,
        allPosts: allNewPosts,
        userDataArray: userDataNewArray,
      };
    }

    case "REMOVE_MEMBER": {
      const userDataNewArray = state.userDataArray.filter(
        (user) => user.id !== action.payload
      );

      const newAllPost = state.allPosts.filter(
        (post) => post.userId !== action.payload
      );

      return {
        ...state,
        allPosts: newAllPost,
        userDataArray: userDataNewArray,
      };
    }

    default:
      return state;
  }
}

export default authReducer;
