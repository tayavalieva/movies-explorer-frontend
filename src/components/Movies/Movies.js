import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Navigation from "../Navigation/Navigation";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import moviesList from "../../utils/moviesList";
import * as moviesApi from "../../utils/MoviesApi";

function Movies() {
  const [isSideModalOpen, setSideModalOpen] = useState(false);
  const [allMovies, setMovies] = useState();

  function handleMenuClick() {
    setSideModalOpen(true);
  }

  function closeSideBar() {
    setSideModalOpen(false);
  }

  useEffect(() => {
    moviesApi
      .getAllMovies()
      .then((allMovies) => {
        setMovies(allMovies);
        console.log(allMovies);
        localStorage.setItem("movies", JSON.stringify(allMovies));
      })
      .catch((err) => console.log(err));
  }, []);

  function getMovie(keyword) {
    console.log(keyword);
  }

  return (
    <section className="movies">
      <Header>
        <Navigation onMenuClick={handleMenuClick} />
      </Header>
      <main>
        <div className="movies-container">
          <SearchForm onGetMovie={getMovie} />
          <FilterCheckbox />
          <Preloader />
          <MoviesCardList movies={moviesList} isSavedMoviesList={false} />
          <button className="movies__more-button">Ещё</button>
        </div>
      </main>
      <Footer />
      <ModalSidebar isOpen={isSideModalOpen} onClose={closeSideBar} />
    </section>
  );
}

export default Movies;
