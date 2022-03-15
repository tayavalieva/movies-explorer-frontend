import "./MoviesCard.css";
import React from "react";
import { BASE_URL } from "../../utils/constants";

function MoviesCard({
  movie,
  savedMovies,
  isSavedMoviesPage,
  onSaveMovie,
  onDeleteMovie,
}) {
  const isSaved = isSavedMoviesPage
    ? true
    : savedMovies.some((m) => m.movieId === movie.id);

  //show delete button
  const saveButtonClassName = `${
    isSavedMoviesPage
      ? "card__delete-button"
      : isSaved
      ? "card__save-button_saved"
      : "card__save-button"
  }`;

  function handleSaveClick() {
    if (!isSaved) {
      onSaveMovie({
        country: movie.country ? movie.country : "",
        director: movie.director ? movie.director : "",
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : "",
        description: movie.description
          ? movie.description
          : movie.nameRU || movie.nameEN,
        image: `${BASE_URL}${movie.image ? movie.image.url : ""}`,
        trailer: movie.trailerLink,
        thumbnail: `${BASE_URL}${
          movie.image.formats.thumbnail ? movie.image.formats.thumbnail.url : ""
        }`,
        movieId: movie.id,
        nameRU: movie.nameRU ? movie.nameRU : movie.nameEN,
        nameEN: movie.nameEN ? movie.nameEN : movie.nameRU,
        isSaved: movie.isSaved,
      });
    } else {
      onDeleteMovie(movie);
    }
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
        href={isSavedMoviesPage ? movie.trailer : movie.trailerLink}
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

        <div className="card__caption">
          <h2 className="card__title">{movieName}</h2>
          <p className="card__info">{movieDuration}</p>
        </div>
      </a>
      <button
        className={saveButtonClassName}
        type="button"
        onClick={handleSaveClick}
      >
        {isSavedMoviesPage ? "" : isSaved ? "" : "Сохранить"}
      </button>
    </li>
  );
}

export default MoviesCard;
