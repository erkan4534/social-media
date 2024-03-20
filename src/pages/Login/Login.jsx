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
      <div className="flex-1 h-dvh">
        <img
          src="https://images.unsplash.com/photo-1710104434504-0261d06fa832?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full"
        />
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
