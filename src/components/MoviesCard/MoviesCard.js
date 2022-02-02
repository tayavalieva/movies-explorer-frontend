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

  function calculateDuration(min) {
    return `${Math.floor(min / 60)}ч ${min % 60}м`;
  }

  const movieName = movie.nameRU;
  const movieImgURL = BASE_URL.concat("/", movie.image.url);
  const movieDuration = calculateDuration(movie.duration);

  return (
    <li className="card">
      <a
        href={movie.trailerLink}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <div className="card__img-container">
          <img src={movieImgURL} alt={movieName} className="card__img"></img>
        </div>
        <div className="card__caption">
          <button
            className={buttonClassName}
            type="button"
            onClick={toggleSaveClick}
          >
            {isSavedMoviesList ? "" : isSaved ? "" : "Сохранить"}
          </button>
          <h2 className="card__title">{movieName}</h2>
          <p className="card__info">{movieDuration}</p>
        </div>
      </a>
    </li>
  );
}

export default MoviesCard;
