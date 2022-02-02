import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Navigation from "../Navigation/Navigation";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import * as moviesApi from "../../utils/MoviesApi";

function Movies() {
  const [isSideModalOpen, setSideModalOpen] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  //console.log(foundMoviesList);
  console.log(localStorage.getItem("foundMoviesList").length);

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
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }, []);

  function getMovie(name) {
    const keyword = name.toLowerCase();

    const foundMoviesList = allMovies.filter(
      (movie) =>
        (movie.nameRU != null &&
          movie.nameRU.toLowerCase().includes(keyword)) ||
        (movie.nameEN != null && movie.nameEN.toLowerCase().includes(keyword))
    );
    if (foundMoviesList.length < 1) {
      setErrorMessage("Ничего не найдено");
    }
    setFoundMoviesList(foundMoviesList);
    localStorage.setItem("foundMoviesList", JSON.stringify(foundMoviesList));

    //render filtered movies
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
          <MoviesCardList
            movies={foundMoviesList}
            error={errorMessage}
            isSavedMoviesList={false}
          />
        </div>
      </main>
      <Footer />
      <ModalSidebar isOpen={isSideModalOpen} onClose={closeSideBar} />
    </section>
  );
}

export default Movies;
