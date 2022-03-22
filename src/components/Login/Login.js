import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Form from "../Form/Form";
import validator from "validator";

function Login({ onLogin }) {
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState({
    emailValid: false,
    passwordValid: false,
  });

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserLoginDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setUserLoginDetails]
  );

  //validate inputs
  useEffect(() => {
    const emailValid = validator.isEmail(userLoginDetails.email);
    const passwordValid = userLoginDetails.password.length > 7;

    setIsFormValid({
      emailValid,
      passwordValid,
    });
  }, [userLoginDetails]);

  const { emailValid, passwordValid } = isFormValid;

  const isButtonDisabled = !emailValid || !passwordValid;

  const submitButtonClassName = isButtonDisabled
    ? "form__button form__button_disabled"
    : "form__button form__button_active";

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userLoginDetails;
    onLogin(email, password);
  }

  return (
    <section className="login">
      <Form
        title="Welcome back!"
        onSubmit={handleSubmit}
        link={
          <div className="form__text-container">
            <p className="form__text">
              Not registered yet?
              <span>
                <Link to="/signup" className="form__link">
                  Sign up
                </Link>
              </span>
            </p>
          </div>
        }
      >
        <label className="form__input-label">
          E-mail
          <input
            className="form__input"
            type="email"
            name="email"
            value={userLoginDetails.email}
            onChange={handleInputChange}
            required
          ></input>
          {!emailValid && (
            <span className="form__input-error">
              Please ensure proper email format
            </span>
          )}
        </label>
        <label className="form__input-label">
          Password
          <input
            className="form__input"
            type="password"
            name="password"
            value={userLoginDetails.name}
            onChange={handleInputChange}
            required
          ></input>
          {!passwordValid && (
            <span className="form__input-error">
              Your password needs to be at least 8 characters long
            </span>
          )}
        </label>
        <button
          className={submitButtonClassName}
          type="submit"
          disabled={isButtonDisabled}
        >
          Log in
        </button>
      </Form>
    </section>
  );
}
export default Login;
