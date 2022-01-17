import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Form from "../Form/Form";

function Login() {
  return (
    <section className="login">
      <Form
        title="Добро пожаловать!"
        link={
          <div className="form__text-container">
            <p className="form__text">
              Еще не зарегистрированы?
              <span>
                <a href="#" className="form__link">
                  Регистрация
                </a>
              </span>
            </p>
          </div>
        }
      >
        <label className="form__input-label">
          Имя
          <input className="form__input"></input>
          <span className="form__input-error"></span>
        </label>
        <label className="form__input-label">
          E-mail
          <input className="form__input"></input>
          <span className="form__input-error"></span>
        </label>
        <label className="form__input-label">
          Пароль
          <input className="form__input"></input>
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
