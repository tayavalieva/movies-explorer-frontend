import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Navigation from "../Navigation/Navigation";

function Movies() {
  return (
    <section className="movies">
      <Header>
        <Navigation />
      </Header>
      <div className="movies-container">
        <SearchForm />
        <FilterCheckbox />
        <Preloader />
        <MoviesCardList />
        <button className="movies__more-button">Ещё</button>
      </div>
      <Footer />
    </section>
  );
}

export default Movies;
