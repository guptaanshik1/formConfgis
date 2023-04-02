import React from "react";
import * as Yup from "yup";
import { signupFormFields } from "../config/signupFormFields";
import { IFormFields } from "../types/IFormFields";
import { validateEmail, validatePhone } from "../utils/utilities";
import GForm from "./GForm";

interface IInitialValues {
  firstName: string;
  lastName: string;
  signupKey: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
}

const Form = () => {
  const formFields: IFormFields = signupFormFields;
  const initialValues: IInitialValues = {
    firstName: "",
    lastName: "",
    signupKey: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  };

  const validation = {
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    signupKey: Yup.string()
      .required("Email or Phone number is required")
      .test("signupKey", (key) => {
        if (validateEmail(key) || validatePhone(key)) {
          return true;
        }
        return false;
      }),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  };
  const validationSchema = Yup.object().shape(validation);
  const onSubmit = () => {
    const payload = { ...initialValues };
    console.log(payload);
  };

  return (
    <GForm
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      btnText={"Signup"}
      onSubmit={onSubmit}
    />
  );
};

export default Form;
