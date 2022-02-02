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
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);

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
        setAllMovies(allMovies);
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
      })
      .catch((err) => console.log(err));
  }, []);

  function getMovie(name) {
    const keyword = name.toLowerCase();

    const foundMovies = allMovies.filter(
      (movie) =>
        (movie.nameRU != null &&
          movie.nameRU.toLowerCase().includes(keyword)) ||
        (movie.nameEN != null && movie.nameEN.toLowerCase().includes(keyword))
    );

    setFoundMovies(foundMovies);
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));

    //render filtered movies
    //if allMovies.length < 1 render 'no movies searched yet'
    //if no movies found, render 'no movies found'
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
