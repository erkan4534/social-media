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

    default:
      return state;
  }
}

export default authReducer;
