import "./Register.css";
import PropTypes from "prop-types";
import React from "react";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataArray } from "../../redux-toolkit/slices/authSlice";
import FileUpload from "../../components/UI/FileUpload/FileUpload";

const initialInput = {
  username: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = ({ showLogin, setIsNewAccountMessage }) => {
  const [inputData, setInputData] = useState(initialInput);
  const [isShowError, setIsShowError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { userDataArray } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && !Object.values(inputData).includes("")) {
      showLogin();
      setIsNewAccountMessage(true);
    }
  }, [showLogin, isSuccess, setIsNewAccountMessage, inputData]);

  function onNewAccountSubmit(event) {
    event.preventDefault();
    setIsShowError(false);
    if (!isFormValid() || !isValidEmail(inputData["email"])) {
      setIsShowError(true);
      setIsSuccess(false);
      return;
    }

    if (inputData["password"] !== inputData["confirmPassword"]) {
      setIsShowError(true);
      setIsSuccess(false);
      return;
    }

    const newUserData = {
      id: userDataArray.length + 1,
      ...inputData,
      role: "memberUser",
      profilePicture: "https://i.pravatar.cc/300",
    };
    dispatch(setUserDataArray(newUserData));
    setIsSuccess(true);
  }

  function handleChange({ target: { name, value } }) {
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function isFormValid() {
    return !Object.values(inputData).some((value) => value.trim() === "");
  }

  const backToLogin = () => {
    showLogin();
    setIsNewAccountMessage(false);
  };

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basit bir e-posta regex ifadesi
    return re.test(email.toLowerCase()); // E-posta adresini test et
  }

  return (
    <div className="newAccountForm">
      <span id="newAccountTitle">New Account</span>
      <form onSubmit={onNewAccountSubmit} noValidate>
        <div className="flex flex-col gap-1">
          {newAccountInputData.map((data) => (
            <React.Fragment key={data.id}>
              <input
                key={data.id}
                placeholder={data.placeholder}
                type={data.type}
                name={data.name}
                value={inputData[data.name]}
                className="newAccountInput"
                onChange={handleChange}
                required={isShowError}
                autoComplete="new-password"
              />
              {!inputData[data.name] && isShowError && (
                <span style={{ color: "#FF0000" }}>It must not be empty</span>
              )}

              {data.name === "email" &&
                inputData[data.name] &&
                !isValidEmail(inputData[data.name]) && (
                  <span style={{ color: "#FF0000" }}>Email is not valid</span>
                )}

              {data.name === "confirmPassword" &&
                inputData[data.name] !== inputData["password"] && (
                  <span style={{ color: "#FF0000" }}>
                    Re-password and password are not the same
                  </span>
                )}
            </React.Fragment>
          ))}
          <FileUpload />
        </div>
        <div className="mt-3 flex justify-between">
          <button className="newAccountButton">Save</button>
          <button
            className="newAccountButton"
            type="button"
            onClick={backToLogin}
          >
            Back To Login
          </button>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  showLogin: PropTypes.func,
  setIsNewAccountMessage: PropTypes.func,
  setIsLoginInValidMessage: PropTypes.func,
};

export default Register;
