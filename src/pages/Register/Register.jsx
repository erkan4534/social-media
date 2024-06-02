import "./Register.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { newAccountInputData } from "../../data/newAccountInputData";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserEmail,
  setUserDataArray,
} from "../../redux-toolkit/slices/authSlice";
import FileUpload from "../../components/UI/FileUpload/FileUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Register = ({ showLogin }) => {
  const { isUserCheck } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

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
      name: Yup.string().required("Required field!"),
      surname: Yup.string().required("Required field!"),
      username: Yup.string().required("Required field!"),
      email: Yup.string()
        .required("Required field!")
        .email("Please enter a valid email address!")
        .test(
          "unique-email",
          "This email address is already registered",
          function (value) {
            dispatch(checkUserEmail(value));
            return !isUserCheck;
          }
        ),
      password: Yup.string()
        .required("Required field!")
        .min(6, "Password must be at least 6 characters long."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required field!"),
    }),
    onSubmit: async (values) => {
      let profilePicture = "https://i.pravatar.cc/300";
      debugger;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "social-media");

        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dwjtgwgok/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          profilePicture = data.secure_url;
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }

      const newUserData = {
        ...values,
        role: "memberUser",
        profilePicture,
        friends: [],
        posts: [],
        status: 1,
      };
      try {
        dispatch(setUserDataArray(newUserData));
        await addDoc(collection(db, "personnels"), newUserData);
        showLogin(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const backToLogin = () => {
    showLogin(false);
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
          <FileUpload onFileSelect={setSelectedFile} />
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
};

export default Register;
