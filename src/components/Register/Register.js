import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import "./Register.css";
import Form from "../Form/Form";
import { nameRegex } from "../../utils/constants";

function Register({ onRegister }) {
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState({
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false,
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserRegistration((prevState) => ({ ...prevState, [name]: value }));
    },
    [setUserRegistration]
  );

  //validate inputs
  useEffect(() => {
    const { name, email, password } = userRegistration;

    const isNameValid = nameRegex.test(name) && name.length > 1;
    const isEmailValid = validator.isEmail(email);
    const isPasswordValid = password.length > 7;

    setIsFormValid({ isNameValid, isEmailValid, isPasswordValid });
  }, [userRegistration]);

  const { isNameValid, isEmailValid, isPasswordValid } = isFormValid;

  const isButtonDisabled = !isNameValid || !isEmailValid || !isPasswordValid;

  const submitButtonClassName = isButtonDisabled
    ? "form__button form__button_disabled"
    : "form__button form__button_active";

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = userRegistration;
    onRegister(name, email, password);
  }

  return (
    <section className="register">
      <Form
        title="Hi!"
        onSubmit={handleSubmit}
        link={
          <div className="form__text-container">
            <p className="form__text">
              Already registered?
              <span>
                <Link to="/signin" className="form__link">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        }
      >
        <label className="form__input-label">
          Name
          <input
            className="form__input"
            type="text"
            value={userRegistration.name}
            name="name"
            onChange={handleChange}
            required
          ></input>
          {!isNameValid && (
            <span className="form__input-error">
              Please ensure the name you've entered has at least two characters
            </span>
          )}
        </label>

        <label className="form__input-label">
          E-mail
          <input
            className="form__input"
            type="email"
            value={userRegistration.email}
            name="email"
            onChange={handleChange}
            required
          ></input>
          {!isEmailValid && (
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
            value={userRegistration.password}
            name="password"
            onChange={handleChange}
            required
          ></input>
          {!isPasswordValid && (
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
          Register
        </button>
      </Form>
    </section>
  );
}
export default Register;
