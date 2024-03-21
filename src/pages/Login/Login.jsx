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

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  function onLoginSubmit(event) {
    event.preventDefault();
    findUser(inputData);
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
          <form onSubmit={onLoginSubmit}>
            <div className="flex flex-col gap-2">
              <input
                placeholder="Email"
                type="email"
                name="email"
                className="loginInput"
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                className="loginInput"
                onChange={handleChange}
              />
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
