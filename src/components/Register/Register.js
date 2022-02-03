import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Form from "../Form/Form";

function Register({ onRegister }) {
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserRegistration({ ...userRegistration, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = userRegistration;
    onRegister(name, email, password);
  }

  return (
    <section className="register">
      <Form
        title="Добро пожаловать!"
        onSubmit={handleSubmit}
        link={
          <div className="form__text-container">
            <p className="form__text">
              Уже зарегистрированы?
              <span>
                <Link to="/signin" className="form__link">
                  Войти
                </Link>
              </span>
            </p>
          </div>
        }
      >
        <label className="form__input-label">
          Имя
          <input
            className="form__input"
            type="text"
            value={userRegistration.name}
            name="name"
            onChange={handleChange}
            required
          ></input>
          <span className="form__input-error"></span>
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
          <span className="form__input-error"></span>
        </label>

        <label className="form__input-label">
          Пароль
          <input
            className="form__input"
            type="password"
            value={userRegistration.password}
            name="password"
            onChange={handleChange}
            required
          ></input>
          <span className="form__input-error"></span>
        </label>
        <button className="form__button" type="submit">
          Зарегистироваться
        </button>
      </Form>
    </section>
  );
}
export default Register;
