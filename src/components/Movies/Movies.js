import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";

function Movies(props) {
  return (
    <section className="movies">
      <Header>
        <Navigation onMenuClick={props.onMenuClick} />
      </Header>
      <main>
        <div className="movies-container">
          <SearchForm
            onSearchMovie={props.onSearchMovie}
            isSavedMoviesPage={props.isSavedMoviesPage}
          />
          <FilterCheckbox
            onFilter={props.onFilter}
            isShortMovie={props.isShortMovie}
          />
          <MoviesCardList
            movies={props.searchedMovies}
            savedMovies={props.savedMovies}
            onSaveMovie={props.onSaveMovie}
            onDeleteMovie={props.onDeleteMovie}
            isSavedMoviesPage={props.isSavedMoviesPage}
          />
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default Movies;
