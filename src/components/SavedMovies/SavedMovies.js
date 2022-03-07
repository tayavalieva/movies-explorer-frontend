import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";

function SavedMovies(props) {
  //if state with saved movies -пустой, то запрос на MainApi, результат запроса записать в local storage

  return (
    <section className="saved-movies">
      <Header>
        <Navigation onMenuClick={props.onMenuClick} />
      </Header>
      <main>
        <div className="saved-movies-container">
          <SearchForm
            onSearchMovie={props.onSearchMovie}
            isSavedMoviesPage={props.isSavedMoviesPage}
          />
          <FilterCheckbox
            onFilter={props.onFilter}
            isShortMovie={props.isShortMovie}
          />
          <MoviesCardList
            movies={props.savedMovies}
            savedMovies={props.savedMovies}
            onDeleteMovie={props.onDeleteMovie}
            isSavedMoviesPage={props.isSavedMoviesPage}
          />
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default SavedMovies;
