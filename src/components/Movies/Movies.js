import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Navigation from "../Navigation/Navigation";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import * as moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

function Movies(props) {
  const [isSideModalOpen, setSideModalOpen] = useState(false);

  //const [filteredShortMovies, setFilteredShortMovies] = useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  function handleMenuClick() {
    setSideModalOpen(true);
  }

  function closeSideBar() {
    setSideModalOpen(false);
  }
  // Как только запрос сделан, данные передаются в стейт-переменную и обновляются в локальном хранилище,
  // а блок появляется. Для отрисовки данных воспользуйтесь хуком.
  //Чтобы получить данные о сохранённых карточках, отправляйте GET-запрос к /movies нашего API.
  //При запросе к серверу за фильмами на странице «Фильмы» вы получаете сразу все данные и сохраняете их.
  //При этом вам потребуется отсортировать результат по ключевому слову, которое ввёл пользователь, и чекбоксу для короткометражных фильмов:

  return (
    <section className="movies">
      <Header>
        <Navigation onMenuClick={handleMenuClick} />
      </Header>
      <main>
        <div className="movies-container">
          <SearchForm onSearchMovie={props.onSearchMovie} />
          <FilterCheckbox />
          <MoviesCardList
            movies={props.searchedMovies}
            savedMovies={props.savedMovies}
            error={props.moviesPageMessage}
            onSaveMovie={props.onSaveMovie}
            isSavedMoviesPage={props.isSavedMoviesPage}
          />
        </div>
      </main>
      <Footer />
      <ModalSidebar isOpen={isSideModalOpen} onClose={closeSideBar} />
    </section>
  );
}

export default Movies;
