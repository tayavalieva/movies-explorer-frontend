import "./MoviesCard.css";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";

function MoviesCard({ movie, savedMovies, isSavedMoviesPage, onSaveMovie }) {
  const isSaved = savedMovies.some((m) => m.movieId === movie.id);

  //const [isSaved, setIsSaved] = useState(false);

  // function toggleSaveClick() {
  //   setIsSaved(!isSaved);
  // }

  //show delete button
  const saveButtonClassName = `${
    isSavedMoviesPage
      ? "card__delete-button"
      : isSaved
      ? "card__save-button_saved"
      : "card__save-button"
  }`;

  function handleSaveClick() {
    onSaveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${BASE_URL}${movie.image ? movie.image.url : ""}`,
      trailer: movie.trailerLink,
      thumbnail: `${BASE_URL}${
        movie.image.formats.thumbnail ? movie.image.formats.thumbnail.url : ""
      }`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      isSaved: movie.isSaved,
    });
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
          <img
            src={isSavedMoviesPage ? movie.image : movieImgURL}
            alt={movieName}
            className="card__img"
          ></img>
        </div>
      </a>
      <div className="card__caption">
        <button
          className={saveButtonClassName}
          type="button"
          onClick={handleSaveClick}
        >
          {isSavedMoviesPage ? "" : isSaved ? "" : "Сохранить"}
        </button>
        <h2 className="card__title">{movieName}</h2>
        <p className="card__info">{movieDuration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
