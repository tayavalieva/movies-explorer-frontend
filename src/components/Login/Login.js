import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Form from "../Form/Form";

function Login({ onLogin }) {
  const [userAuthorization, setUserAuthorization] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserAuthorization({ ...userAuthorization, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userAuthorization;
    onLogin(email, password);
  }

  return (
    <section className="login">
      <Form
        title="Рады видеть!"
        onSubmit={handleSubmit}
        link={
          <div className="form__text-container">
            <p className="form__text">
              Еще не зарегистрированы?
              <span>
                <Link to="/signup" className="form__link">
                  Регистрация
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
            value={userAuthorization.email}
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
            name="password"
            value={userAuthorization.name}
            onChange={handleChange}
            required
          ></input>
          <span className="form__input-error"></span>
        </label>
        <button className="form__button" type="submit">
          Войти
        </button>
      </Form>
    </section>
  );
}
export default Login;
