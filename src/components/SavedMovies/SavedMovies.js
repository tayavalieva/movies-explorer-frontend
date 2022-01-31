import { useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import Navigation from "../Navigation/Navigation";
import savedMoviesList from "../../utils/savedMoviesList";

function SavedMovies() {
  const [isSideModalOpen, setSideModalOpen] = useState(false);

  function handleMenuClick() {
    setSideModalOpen(true);
  }

  function closeSideBar() {
    setSideModalOpen(false);
  }

  return (
    <section className="saved-movies">
      <Header>
        <Navigation onMenuClick={handleMenuClick} />
      </Header>
      <main>
        <div className="saved-movies-container">
          <SearchForm />
          <FilterCheckbox />
          <MoviesCardList movies={savedMoviesList} isSavedMoviesList={true} />
        </div>
      </main>
      <Footer />
      <ModalSidebar isOpen={isSideModalOpen} onClose={closeSideBar} />
    </section>
  );
}

export default SavedMovies;
