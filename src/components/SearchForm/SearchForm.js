import "./SearchForm.css";
import React, { useEffect, useState } from "react";

function SearchForm(props) {
  const [searchedMovie, setSearchedMovie] = useState("");
  const [error, setError] = useState("");

  function handleSearchMovie(e) {
    setSearchedMovie(e.target.value);
    if (e.target.value.length < 1) {
      setError("Нужно ввести ключевое слово");
    }
  }

  function resetInput() {
    setSearchedMovie("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearchMovie(searchedMovie, props.isSavedMoviesPage);
    resetInput();
    setError("");
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
      <span className="search-form__input-error">{error}</span>
    </section>
  );
}

export default SearchForm;
