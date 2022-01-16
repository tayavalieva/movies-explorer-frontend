import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <FilterCheckbox />
    </section>
  );
}

export default Movies;
