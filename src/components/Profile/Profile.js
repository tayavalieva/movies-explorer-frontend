import "./Profile.css";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { nameRegex } from "../../utils/constants";

function Profile({ onUpdateUser, updateMessage, onSignOut, onMenuClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleNameChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  //validate inputs
  useEffect(() => {
    const nameValid = nameRegex.test(name) && name.length > 0;
    setIsNameValid(nameValid);
  }, [name]);

  useEffect(() => {
    const emailValid = validator.isEmail(email);
    setIsEmailValid(emailValid);
  }, [email]);

  //if new data is the same as previous data, then button is still disabled
  const isButtonDisabled =
    !isNameValid ||
    !isEmailValid ||
    (name === currentUser.name && email === currentUser.email);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
    });
  }

  const submitButtonClassName = isButtonDisabled
    ? "profile__form-submit-btn profile__form-submit-btn_disabled"
    : "profile__form-submit-btn profile__form-submit-btn_active";

  return (
    <section className="profile">
      <Header>
        <Navigation onMenuClick={onMenuClick} />
      </Header>
      <main>
        <div className="profile-container">
          <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
          <form className="profile__form-container" onSubmit={handleSubmit}>
            <div className="profile__input-container">
              <p className="profile__input-label-name">Имя</p>
              <input
                type="text"
                className="profile__input"
                value={name}
                onChange={handleNameChange}
                name="name"
                required
              ></input>
            </div>
            {!isNameValid && (
              <p className="form__input-error">
                Введите имя в корректном формате
              </p>
            )}
            <div className="profile__input-container">
              <p className="profile__input-label-name">Email</p>
              <input
                className="profile__input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                name="email"
              ></input>
            </div>
            {!isEmailValid && (
              <p className="form__input-error">
                Введите email в корректном формате
              </p>
            )}
            <p className="profile__message">{updateMessage}</p>
            <button
              disabled={isButtonDisabled}
              className={submitButtonClassName}
              type="submit"
            >
              Редактировать
            </button>
          </form>
          <Link to="/signin" onClick={onSignOut} className="profile__exit">
            Выйти из аккаунта
          </Link>
        </div>
      </main>
    </section>
  );
}

export default Profile;
