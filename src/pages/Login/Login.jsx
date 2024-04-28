import "./Login.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import {
  login,
  setLoginInvalidMessage,
} from "../../redux-toolkit/slices/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const [isShowNewAccount, setIsShowNewAccount] = useState(false);
  const [isNewAccountMessage, setIsNewAccountMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isLoginInValidMessage, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoggedIn) {
      user.role === "adminUser" ? navigate("/admin") : navigate("/home");
    }
  }, [isLoggedIn, navigate, user]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required field!")
        .email("Please enter a valid email address!"),
      password: Yup.string().required("Required field!"),
    }),

    onSubmit: (values) => {
      dispatch(login({ email: values.email, password: values.password }));
    },
  });

  const showNewAccount = () => {
    setIsShowNewAccount(true);
    setIsNewAccountMessage(false);
    dispatch(setLoginInvalidMessage(false));
    formik.resetForm();
  };

  const showLogin = (isAdd) => {
    setIsShowNewAccount(false);
    isAdd ? setIsNewAccountMessage(true) : setIsNewAccountMessage(false);
  };

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
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="loginInput"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  autoComplete="new-password"
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-red-600">{formik.errors.email}</small>
                )}
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="loginInput"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  autoComplete="new-password"
                />
                {formik.touched.password && formik.errors.password && (
                  <small className="text-red-600">
                    {formik.errors.password}
                  </small>
                )}
              </div>

              <div className="mt-3 flex justify-between">
                <button className="loginButton" type="submit">
                  Log In
                </button>
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

        {isShowNewAccount && <Register showLogin={showLogin} />}
      </div>
    </div>
  );
};

export default Login;
