import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, { useEffect, useState } from "react";

function MoviesCardList(props) {
  const screenWidth = window.innerWidth;

  const [renderParams, setRenderParams] = useState({
    renderNumber: 0,
    showMore: 0,
  });

  // Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
  // Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки.
  // Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.

  //params depending on the screen width
  useEffect(() => {
    if (screenWidth > 1279) {
      setRenderParams({ renderNumber: 12, showMore: 3 });
    } else if (screenWidth > 767) {
      setRenderParams({ renderNumber: 8, showMore: 2 });
    } else setRenderParams({ renderNumber: 5, showMore: 2 });
  }, [screenWidth]);

  //number of movies to render
  const [totalNumberToRender, setTotalNumberToRender] = useState(
    renderParams.renderNumber
  );

  function handleMoreClick() {
    const moviesNumber = totalNumberToRender + renderParams.showMore;

    if (moviesNumber < props.movies.length) {
      setTotalNumberToRender(moviesNumber);
    } else {
      setTotalNumberToRender(props.movies.length);
    }
  }

  //TODO: amend initial state of totalNumberToRender: min is renderParams.renderNumber
  console.log(renderParams.renderNumber, totalNumberToRender);

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
