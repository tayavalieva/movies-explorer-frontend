import "./Profile.css";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, onSignOut }) {
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
    const nameValid = name.length > 1;
    setIsNameValid(nameValid);
  }, [name]);

  useEffect(() => {
    const emailValid = validator.isEmail(email);
    setIsEmailValid(emailValid);
  }, [email]);

  const isButtonDisabled = !isNameValid || !isEmailValid;

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
        <Navigation />
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
