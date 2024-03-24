import "./NewAccount.css";
import PropTypes from "prop-types";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useEffect, useState } from "react";
import { userData } from "../../data/userData";

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
  const [userDataArray, setUserDataArray] = useState(userData);
  const [inputData, setInputData] = useState(initialInput);
  const [isShowError, setIsShowError] = useState(false);
  const [required, setRequired] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setRequired(false);
    if (!isValidateForm()) {
      setRequired(true);
      setIsSuccess(false);
      return;
    } else {
      const newInputData = {
        id: userDataArray.length + 1,
        ...inputData,
      };
      setUserDataArray([...userDataArray, newInputData]);
      setIsSuccess(true);
    }
  }

  function handleChange({ target: { name, value } }) {
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function isValidateForm() {
    const isFormValid = Object.values(inputData).some(
      (value) => value.trim() == ""
    );

    if (isFormValid) {
      setIsShowError(true);
      return false;
    }

    return true;
  }

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
              required={required}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between">
          <button className="newAccountButton">Save</button>
          <button
            className="newAccountButton"
            type="button"
            onClick={showLogin}
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
