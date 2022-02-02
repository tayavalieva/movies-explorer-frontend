import "./MoviesCard.css";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
//import savedMoviesList from "../../utils/savedMoviesList";

function MoviesCard({ movie, isSavedMoviesList }) {
  //const isSaved = savedMoviesList.some((m) => m.id === movie.id);
  const [isSaved, setIsSaved] = useState(false);

  const buttonClassName = `${
    isSavedMoviesList
      ? "card__delete-button"
      : isSaved
      ? "card__save-button_saved"
      : "card__save-button"
  }`;

  function toggleSaveClick() {
    setIsSaved(!isSaved);
  }

  const imgURL = BASE_URL.concat("/", movie.image.url);

  console.log(imgURL);

  return (
    <li className="card">
      <a
        href={movie.trailerLink}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <div className="card__img-container">
          <img src={imgURL} alt={movie.nameRU} className="card__img"></img>
        </div>
        <div className="card__caption">
          <button
            className={buttonClassName}
            type="button"
            onClick={toggleSaveClick}
          >
            {isSavedMoviesList ? "" : isSaved ? "" : "Сохранить"}
          </button>
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__info">1ч 17м</p>
        </div>
      </a>
    </li>
  );
}

export default MoviesCard;
