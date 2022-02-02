import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="card-list__container">
      <Preloader />
      <ul className="card-list">
        {props.error ? (
          <p className="card-list__message">{props.error}</p>
        ) : (
          props.movies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}
              isSavedMoviesList={props.isSavedMoviesList}
            />
          ))
        )}
      </ul>
      {props.movies.length > 0 && (
        <button className="card-list__more">Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
