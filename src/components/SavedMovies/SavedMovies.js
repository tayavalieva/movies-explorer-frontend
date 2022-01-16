import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
    </section>
  );
}

export default SavedMovies;
