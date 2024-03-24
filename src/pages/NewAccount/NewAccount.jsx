import "./NewAccount.css";
import PropTypes from "prop-types";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const initialInput = {
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const NewAccount = ({
  showLogin,
  setIsNewAccountMessage,
  setIsLoginInValidMessage,
}) => {
  const [inputData, setInputData] = useState(initialInput);
  const [isShowError, setIsShowError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { userDataArray, setUserDataArray } = useContext(AuthContext);

  useEffect(() => {
    if (isSuccess && !Object.values(inputData).includes("")) {
      showLogin();
      setIsLoginInValidMessage(false);
      setIsNewAccountMessage(true);
    }
  }, [
    showLogin,
    isSuccess,
    setIsLoginInValidMessage,
    setIsNewAccountMessage,
    inputData,
  ]);

  function onNewAccountSubmit(event) {
    event.preventDefault();
    setIsShowError(false);
    if (!isFormValid()) {
      setIsShowError(true);
      setIsSuccess(false);
      return;
    }

    const newUserData = {
      id: userDataArray.length + 1,
      ...inputData,
    };
    setUserDataArray([...userDataArray, newUserData]);
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
    setIsLoginInValidMessage(false);
    setIsNewAccountMessage(false);
  };

  return (
    <div className="newAccountForm">
      <span id="newAccountTitle">New Account</span>
      {isShowError && <span>Please fill all input</span>}
      <form onSubmit={onNewAccountSubmit} noValidate>
        <div className="flex flex-col gap-2">
          {newAccountInputData.map((data) => (
            <input
              key={data.id}
              placeholder={data.placeholder}
              type={data.type}
              name={data.name}
              className="newAccountInput"
              onChange={handleChange}
              required={isShowError}
            />
          ))}
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

NewAccount.propTypes = {
  showLogin: PropTypes.func,
  setIsNewAccountMessage: PropTypes.func,
  setIsLoginInValidMessage: PropTypes.func,
};

export default NewAccount;
