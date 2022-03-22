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
  //TODO: add to the closest number % by films number !== 0 (should be number % 2 || number % 3 !== 0)
  // state of films to render
  // useEffect on screen width change: add a number of films to total films to render so that the final number of films to render
  // is divisible by 3 or 2 without remainder (so that it is divisble by the remainder)

  //info messages
  const message =
    props.movies.length <= 0
      ? props.isSavedMoviesPage
        ? "No saved films yet"
        : "No films found"
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
            Show more
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
