import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <button className="movies__more-button">Ещё</button>
    </section>
  );
}

export default Movies;
