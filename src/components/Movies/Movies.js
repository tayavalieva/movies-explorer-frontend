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

function Movies() {
  const [isSideModalOpen, setSideModalOpen] = useState(false);

  function handleMenuClick() {
    console.log("click");
    setSideModalOpen(true);
  }

  function closeSideBar() {
    setSideModalOpen(false);
  }

  return (
    <section className="movies">
      <Header>
        <Navigation onMenuClick={handleMenuClick} onClose={closeSideBar} />
      </Header>
      <div className="movies-container">
        <SearchForm />
        <FilterCheckbox />
        <Preloader />
        <MoviesCardList />
        <button className="movies__more-button">Ещё</button>
      </div>
      <Footer />
      <ModalSidebar isOpen={isSideModalOpen} onClose={closeSideBar} />
    </section>
  );
}

export default Movies;
