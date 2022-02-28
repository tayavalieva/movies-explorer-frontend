import React, { useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies(props) {
  const [isSideModalOpen, setSideModalOpen] = useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  function handleMenuClick() {
    setSideModalOpen(true);
  }

  function closeSideBar() {
    setSideModalOpen(false);
  }
  //if state with saved movies -пустой, то запрос на MainApi, результат запроса записать в local storage

  return (
    <section className="saved-movies">
      <Header>
        <Navigation onMenuClick={handleMenuClick} />
      </Header>
      <main>
        <div className="saved-movies-container">
          <SearchForm />
          <FilterCheckbox />
          <MoviesCardList
            movies={props.savedMovies}
            savedMovies={props.savedMovies}
            onDeleteMovie={props.onDeleteMovie}
            isSavedMoviesPage={props.isSavedMoviesPage}
          />
        </div>
      </main>
      <Footer />
      <ModalSidebar isOpen={isSideModalOpen} onClose={closeSideBar} />
    </section>
  );
}

export default SavedMovies;
