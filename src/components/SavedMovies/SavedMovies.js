import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header>
        <Navigation />
      </Header>
      <div className="saved-movies-container">
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList />
      </div>
      <Footer />
    </section>
  );
}

export default SavedMovies;
