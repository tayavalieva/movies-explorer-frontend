import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <FilterCheckbox />
      <Preloader />
      <MoviesCardList />
      <button className="movies__more-button">Ещё</button>
    </section>
  );
}

export default Movies;
