import { userData } from "../../data/userData";

const initialState = {
  user: null,
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
      };

    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          firends: [...state.user.firends, action.payload],
        },
      };

    case "SET_USER_DATA_ARRAY":
      return {
        ...state,
        userDataArray: [...state.userDataArray, action.payload],
        isLoginInValidMessage: false,
      };

    case "REMOVE_USER": {
      const newFirens = state.user.firends.filter(
        (user) => user.id != action.payload
      );

      return {
        ...state,
        user: {
          ...state.user,
          firends: newFirens,
        },
      };
    }

    default:
      return state;
  }
}

export default authReducer;
