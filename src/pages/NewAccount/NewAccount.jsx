import "./NewAccount.css";
import PropTypes from "prop-types";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useState } from "react";

const initialInput = {
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const NewAccount = ({ showLogin }) => {
  const [inputDataArray] = useState(newAccountInputData);
  const [inputData, setInputData] = useState(initialInput);
  const [isShowError, setIsShowError] = useState(false);
  const [required, setRequired] = useState(false);

  function onNewAccountSubmit(event) {
    event.preventDefault();
    setRequired(true);
    isValidateForm();
  }

  function handleChange({ target: { name, value } }) {
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function isValidateForm() {
    const isFormValid = Object.values(inputData).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      setIsShowError(true);
      return;
    }
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
          <button className="newAccountButton" onClick={showLogin}>
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
