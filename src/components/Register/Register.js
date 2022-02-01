import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Form from "../Form/Form";

function Register() {
  return (
    <section className="register">
      <Form
        title="Добро пожаловать!"
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
          Зарегистироваться
        </button>
      </Form>
    </section>
  );
}
export default Register;
