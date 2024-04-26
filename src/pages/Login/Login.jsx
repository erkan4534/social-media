import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { login } from "../../redux-toolkit/slices/authSlice";

import "./Login.css";

const initial = {
  password: "",
  email: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState(initial);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [isShowNewAccount, setIsShowNewAccount] = useState(false);
  const [isNewAccountMessage, setIsNewAccountMessage] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, isLoginInValidMessage, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoggedIn) {
      user.role === "adminUser" ? navigate("/admin") : navigate("/home");
    }
  }, [isLoggedIn, navigate, user]);

  function onLoginSubmit(event) {
    event.preventDefault();
    if (isValidateForm()) {
      dispatch(login(inputData));
    }
  }

  function isValidateForm() {
    const { email, password } = inputData;
    let valid = true;
    if (email.trim() === "") {
      setEmailValid(true);
      valid = false;
    } else {
      setEmailValid(false);
    }

    if (password.trim() === "") {
      setPasswordValid(true);
      valid = false;
    } else {
      setPasswordValid(false);
    }

    return valid;
  }

  function handleChange({ target: { name, value } }) {
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  const showNewAccount = () => setIsShowNewAccount(true);

  const showLogin = () => setIsShowNewAccount(false);

  return (
    <div className="homeContainer">
      <div className="loginLogoPart">
        <span className="loginLogo">Social Media</span>
      </div>
      <div className="loginInputPart">
        {!isShowNewAccount && (
          <div className="loginForm">
            <span id="loginTitle">Login In</span>
            {isLoginInValidMessage && <span>Invalid Password or Email</span>}
            {isNewAccountMessage && <span>New Account is added</span>}
            <form onSubmit={onLoginSubmit} noValidate>
              <div className="flex flex-col gap-2">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="loginInput"
                  onChange={handleChange}
                  required={emailValid}
                />
                {emailValid && <span>It should be a valid email address!</span>}
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="loginInput"
                  onChange={handleChange}
                  required={passwordValid}
                />
                {passwordValid && <span>Enter your password</span>}
              </div>

              <div className="mt-3 flex justify-between">
                <button className="loginButton">Log In</button>
                <button
                  className="loginButton"
                  type="button"
                  onClick={showNewAccount}
                >
                  Create a New Account
                </button>
              </div>
            </form>
          </div>
        )}

        {isShowNewAccount && (
          <Register
            showLogin={showLogin}
            setIsNewAccountMessage={setIsNewAccountMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
