import "./Register.css";
import PropTypes from "prop-types";
import React from "react";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataArray } from "../../redux-toolkit/slices/authSlice";
import FileUpload from "../../components/UI/FileUpload/FileUpload";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = ({
  showLogin,
  setIsNewAccountMessage,
  setIsShowNewAccount,
}) => {
  const { userDataArray } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Zorunlu Alan!"),
      surname: Yup.string().required("Zorunlu Alan!"),
      username: Yup.string().required("Zorunlu Alan!"),
      email: Yup.string()
        .required("Zorunlu Alan!")
        .email("Geçerli bir e-mail giriniz!")
        .test(
          "unique-email", // Test adı
          "Bu e-mail adresi sistemde kayıtlıdır",
          function (value) {
            return !userDataArray.find((usr) => usr.email === value);
          }
        ),
      password: Yup.string()
        .required("Zorunlu Alan!")
        .min(6, "Şifre en az 6 karakter olmalı!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Şifreler eşleşmeli!")
        .required("Zorunlu Alan!"),
    }),
    onSubmit: (values) => {
      const newUserData = {
        id: userDataArray.length + 1,
        ...values,
        role: "memberUser",
        profilePicture: "https://i.pravatar.cc/300",
      };
      dispatch(setUserDataArray(newUserData));
      setIsNewAccountMessage(true);
      setIsShowNewAccount(false);
    },
  });

  const backToLogin = () => {
    showLogin();
    setIsNewAccountMessage(false);
  };

  return (
    <div className="newAccountForm">
      <span id="newAccountTitle">New Account</span>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="flex flex-col gap-1">
          {newAccountInputData.map((data) => (
            <React.Fragment key={data.id}>
              <input
                placeholder={data.placeholder}
                type={data.type}
                name={data.name}
                className="newAccountInput"
                autoComplete="new-password"
                value={formik.values[data.name]}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              {formik.touched[data.name] && formik.errors[data.name] && (
                <small className="text-red-600">
                  {formik.errors[data.name]}
                </small>
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
  setIsShowNewAccount: PropTypes.func,
};

export default Register;
