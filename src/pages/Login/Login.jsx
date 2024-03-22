import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const initial = {
  password: "",
  email: "",
};

const Login = () => {
  const { findUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState(initial);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  function onLoginSubmit(event) {
    event.preventDefault();
    if (isValidateForm()) {
      findUser(inputData);
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

  return (
    <div className="flex">
      <div className="flex-1 h-dvh flex justify-center items-center">
        <span className=" text-[#1775ee] font-bold text-[60px]">
          Social Media
        </span>
      </div>
      <div className="flex-1">
        <div className="loginForm">
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
              <button className="loginButton">Create a New Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
