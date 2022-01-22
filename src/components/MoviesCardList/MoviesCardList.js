import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import moviesList from "../../utils/moviesList";

console.log(moviesList);

function MoviesCardList() {
  return (
    <section>
      <ul className="card-list">
        {moviesList.map((movie) => {
          return <MoviesCard movie={movie} />;
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
