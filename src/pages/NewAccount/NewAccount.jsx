import "./NewAccount.css";
import PropTypes from "prop-types";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useState } from "react";
const NewAccount = ({ showLogin }) => {
  const [inputDataArray, setInputDataArray] = useState(newAccountInputData);

  function onNewAccountSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="newAccountForm">
      <form onSubmit={onNewAccountSubmit} noValidate>
        <div className="flex flex-col gap-2">
          {inputDataArray.map((inputData) => (
            <input
              key={inputData.id}
              placeholder={inputData.placeholder}
              type={inputData.type}
              name={inputData.name}
              className="newAccountInput"
              // onChange={handleChange}
              required={inputData.required}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between">
          <button className="newAccountButton" onClick={showLogin}>
            Back To newAccount
          </button>
          <button className="newAccountButton">Save</button>
        </div>
      </form>
    </div>
  );
};

NewAccount.propTypes = {
  showLogin: PropTypes.func,
};

export default NewAccount;
