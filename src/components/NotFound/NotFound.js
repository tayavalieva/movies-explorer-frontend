import "./NotFound.css";
import React from "react";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  function handleBackButton() {
    history.goBack();
  }

  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__content">Страница не найдена</p>
      <button className="not-found__button" onClick={handleBackButton}>
        Назад
      </button>
    </div>
  );
}

export default NotFound;
