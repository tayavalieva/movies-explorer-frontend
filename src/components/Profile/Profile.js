import "./Profile.css";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

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
            <button className="profile__form-submit-btn" tupe="submit">
              Редактировать
            </button>
          </form>
          <button type="button" className="profile__exit-btn">
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </section>
  );
}

export default Profile;
