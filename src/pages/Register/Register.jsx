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

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basit bir e-posta regex ifadesi
  return re.test(email.toLowerCase()); // E-posta adresini test et
}

const Register = ({
  showLogin,
  setIsNewAccountMessage,
  setEmailValid,
  setPasswordValid,
}) => {
  const [inputData, setInputData] = useState(initialInput);
  const [formErrors, setFormErrors] = useState({});
  const { userDataArray } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.values(inputData).includes("") && formErrors.success) {
      showLogin();
      setIsNewAccountMessage(true);
    }
  }, [inputData, formErrors, showLogin, setIsNewAccountMessage]);

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm(inputData);
    setFormErrors(errors);
    debugger;
    console.log(formErrors.emptyMessage);
    if (!errors.hasErrors) {
      const newUserData = {
        id: userDataArray.length + 1,
        ...inputData,
        role: "memberUser",
        profilePicture: "https://i.pravatar.cc/300",
      };
      dispatch(setUserDataArray(newUserData));
      setIsNewAccountMessage(true);
    }
  }

  const validateForm = (data) => {
    debugger;
    const errors = { hasErrors: false };

    if (Object.values(data).some((value) => value.trim() === "")) {
      errors.emptyMessage = "All fields are required.";
      errors.hasErrors = true;
    }

    if (!isValidEmail(data.email)) {
      errors.email = { name: "email", message: "Email is not valid." };
      errors.hasErrors = true;
    }

    if (data.email && userDataArray.some((user) => user.email === data.email)) {
      errors.email = {
        name: "email",
        message: "This email has already been used.",
      };
      errors.hasErrors = true;
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = {
        name: "confirmPassword",
        message: "Passwords do not match.",
      };
      errors.hasErrors = true;
    }

    return errors;
  };

  function handleChange({ target: { name, value } }) {
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  const backToLogin = () => {
    showLogin();
    setIsNewAccountMessage(false);
    setEmailValid(false);
    setPasswordValid(false);
  };

  return (
    <div className="newAccountForm">
      <span id="newAccountTitle">New Account</span>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1">
          {newAccountInputData.map((data) => (
            <React.Fragment key={data.id}>
              <input
                placeholder={data.placeholder}
                type={data.type}
                name={data.name}
                value={inputData[data.name]}
                className="newAccountInput"
                onChange={handleChange}
                autoComplete="new-password"
              />

              {formErrors[data.name] && (
                <span style={{ color: "#FF0000" }}>
                  {formErrors[data.name].message}
                </span>
              )}

              {!inputData[data.name] && (
                <span style={{ color: "#FF0000" }}>
                  {formErrors.emptyMessage}
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
  setEmailValid: PropTypes.func,
  setPasswordValid: PropTypes.func,
};

export default Register;
