import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section>
      <ul className="card-list">
        {props.movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={movie.id}
              isSavedMoviesList={props.isSavedMoviesList}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
