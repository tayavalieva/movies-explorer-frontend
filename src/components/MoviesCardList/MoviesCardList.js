import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useState, Suspense } from "react";

function MoviesCardList(props) {
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

  //info messages
  const message =
    props.movies.length <= 0
      ? props.isSavedMoviesPage
        ? "Пока нет сохраненных фильмов"
        : "Фильмов не найдено"
      : null;

  return (
    <section className="card-list__container">
      <Suspense fallback={<Preloader />}>
        <ul className="card-list">
          {message ? (
            <p className="card-list__message">{message}</p>
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
      </Suspense>
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
