import "./NewAccount.css";
import PropTypes from "prop-types";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useEffect, useState } from "react";

const initialInput = {
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const NewAccount = ({ showLogin }) => {
  const [inputDataArray, setInputDataArray] = useState(newAccountInputData);
  const [inputData, setInputData] = useState(initialInput);
  const [isShowError, setIsShowError] = useState(false);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    if (!isShowError) {
      return;
    }

    if (!required) {
      showLogin();
    }
  }, [inputDataArray, showLogin, isShowError, required]);

  function onNewAccountSubmit(event) {
    event.preventDefault();
    setRequired(false);
    if (!isValidateForm()) {
      setRequired(true);
      return;
    } else {
      const newInputData = {
        id: inputDataArray.length + 1,
        ad: inputData.name,
        surname: inputData.surname,
        password: inputData.password,
        email: inputData.email,
      };
      setInputDataArray([...inputDataArray, newInputData]);
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
};

export default NewAccount;
