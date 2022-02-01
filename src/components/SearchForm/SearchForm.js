import "./SearchForm.css";
import React, { useEffect, useState } from "react";

function SearchForm(props) {
  const [searchedMovie, setSearchedMovie] = useState("");

  function handleSearchMovie(e) {
    setSearchedMovie(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onGetMovie(searchedMovie);
    resetInput();
  }

  function resetInput() {
    setSearchedMovie("");
  }

  return (
    <section className="search-form">
      <form className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          name="search-field"
          value={searchedMovie}
          placeholder="Фильм"
          onChange={handleSearchMovie}
          required
        ></input>
        <button
          className="search-form__button"
          type="submit"
          onClick={handleSubmit}
        >
          Найти
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
