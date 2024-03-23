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
  const [inputDataArray] = useState(newAccountInputData);
  const [userDataArray, setUserDataArray] = useState(userData);
  const [inputData, setInputData] = useState(initialInput);
  const [isShowError, setIsShowError] = useState(false);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    if (!isShowError) {
      setIsLoginInValidMessage(false);
      setIsNewAccountMessage(false);
      return;
    }

    if (!required) {
      showLogin();
      setIsLoginInValidMessage(false);
      setIsNewAccountMessage(true);
    }
  }, [
    userDataArray,
    showLogin,
    isShowError,
    required,
    setIsLoginInValidMessage,
    setIsNewAccountMessage,
  ]);

  function onNewAccountSubmit(event) {
    event.preventDefault();
    setRequired(false);
    if (!isValidateForm()) {
      setRequired(true);
      return;
    } else {
      const newInputData = {
        id: userDataArray.length + 1,
        ad: inputData.name,
        surname: inputData.surname,
        password: inputData.password,
        email: inputData.email,
      };
      setUserDataArray([...inputDataArray, newInputData]);
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
          {inputDataArray.map((data) => (
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
