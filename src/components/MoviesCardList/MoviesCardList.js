import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState } from "react/cjs/react.development";
import React, { useEffect } from "react";

function MoviesCardList(props) {
  const screenWidth = window.innerWidth;

  const [renderParams, setRenderParams] = useState({
    renderNumber: 0,
    showMore: 0,
  });

  // Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
  // Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки.
  // Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.

  React.useEffect(() => {
    if (screenWidth > 1279) {
      setRenderParams({ renderNumber: 12, showMore: 3 });
    } else if (screenWidth > 767) {
      setRenderParams({ renderNumber: 8, showMore: 2 });
    } else setRenderParams({ renderNumber: 5, showMore: 2 });
  }, [screenWidth]);

  function handleMoreClick() {}

  return (
    <section className="card-list__container">
      <Preloader />
      <ul className="card-list">
        {props.error ? (
          <p className="card-list__message">{props.error}</p>
        ) : (
          props.movies
            .slice(0, renderParams.renderNumber)
            .map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id}
                onSaveMovie={props.onSaveMovie}
                isSavedMoviesList={props.isSavedMoviesList}
              />
            ))
        )}
      </ul>
      {props.movies.length > 0 && (
        <button className="card-list__more" onClick={handleMoreClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
