import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useState } from "react";

function MoviesCardList(props) {
  // Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
  // Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки.
  // Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.

  //params depending on the screen width

  function calculateShowMore() {
    return window.innerWidth > 1279 ? 3 : 2;
  }

  //number of movies to render
  const [totalNumberToRender, setTotalNumberToRender] = useState(() => {
    if (window.innerWidth > 1279) {
      return 12;
    } else if (window.innerWidth > 767) {
      return 8;
    } else return 5;
  });

  function handleMoreClick() {
    const moviesNumber = totalNumberToRender + calculateShowMore();

    if (moviesNumber < props.movies.length) {
      setTotalNumberToRender(moviesNumber);
    } else {
      setTotalNumberToRender(props.movies.length);
    }
  }
  //добавить до ближайшего числа, которое делится на к-во фильмов в колонке делиться без остатка на 3 или на 2
  // 1 стейт к-во фильмов, кот показывать
  // изменять в 2 случаях на useEffect на ширину экрана к тотал филмс добавить что-то чтобы делилось остаток от деления

  return (
    <section className="card-list__container">
      <Preloader />
      <ul className="card-list">
        {props.error ? (
          <p className="card-list__message">{props.error}</p>
        ) : (
          props.movies
            .slice(
              0,
              props.isSavedMoviesPage
                ? props.movies.length
                : totalNumberToRender
            )
            .map((movie) => (
              <MoviesCard
                movie={movie}
                savedMovies={props.savedMovies}
                key={movie.id || movie.movieId}
                onSaveMovie={props.onSaveMovie}
                onDeleteMovie={props.onDeleteMovie}
                isSavedMoviesPage={props.isSavedMoviesPage}
              />
            ))
        )}
      </ul>
      {props.movies.length > 0 &&
        !props.isSavedMoviesPage &&
        totalNumberToRender < props.movies.length && (
          <button className="card-list__more" onClick={handleMoreClick}>
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
