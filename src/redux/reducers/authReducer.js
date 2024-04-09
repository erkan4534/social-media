import { userData } from "../../data/userData";

const initialState = {
  user: null,
  posts: [],
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

      return userDetailData
        ? {
            ...state,
            user: userDetailData,
            isLoggedIn: true,
            isLoginInValidMessage: false,
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
          return { ...usr, posts: [...usr.posts, action.payload] };
        }

        return usr;
      });

      return {
        ...state,
        user: {
          ...state.user,
          posts: [...state.user.posts, action.payload],
        },
        userDataArray: updatedUserDataArray,
      };
    }
    case "SET_USER_LIKE":
      return {
        ...state,
        user: {
          ...state.user,
          posts: [...state.user.posts, action.payload],
        },
      };

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

    case "REMOVE_USER_POST": {
      const newUserDataArray = state.userDataArray.map((usr) => {
        if (usr.id === action.payload.userId) {
          return { ...usr, posts: action.payload.posts };
        }
        return usr;
      });

      if (state.user.id === action.payload.userId) {
        return {
          ...state,
          user: {
            ...state.user,
            posts: action.payload.posts,
          },
          userDataArray: newUserDataArray,
        };
      }

      return {
        ...state,
        userDataArray: newUserDataArray,
      };
    }

    default:
      return state;
  }
}

export default authReducer;
