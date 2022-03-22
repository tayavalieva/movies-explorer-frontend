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
      <p className="not-found__content">Page not found</p>
      <button className="not-found__button" onClick={handleBackButton}>
        Back
      </button>
    </div>
  );
}

export default NotFound;
