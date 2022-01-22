import "./MoviesCard.css";
import React, { useState } from "react";
//import savedMoviesList from "../../utils/savedMoviesList";

function MoviesCard({ movie }) {
  //const isSaved = savedMoviesList.some((m) => m.id === movie.id);
  const [isSaved, setIsSaved] = useState(false);

  const saveButtonClassName = `${
    isSaved ? "card__save-button_saved" : "card__save-button"
  }`;

  function toggleSaveClick() {
    setIsSaved(!isSaved);
  }

  return (
    <li className="card">
      <img src={movie.image} alt={movie.nameRU} className="card__img"></img>
      <div className="card__caption">
        <button
          className={saveButtonClassName}
          type="button"
          onClick={toggleSaveClick}
        >
          {isSaved ? "" : "Сохранить"}
        </button>
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__info">1ч 17м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
