import "./SearchForm.css";
import React, { useState } from "react";

function SearchForm(props) {
  const [searchedMovie, setSearchedMovie] = useState(props.keyword);
  const [error, setError] = useState("");

  function handleSearchMovie(e) {
    setSearchedMovie(e.target.value);
    if (!props.isSavedMoviesPage && e.target.value.length < 1) {
      setError("Нужно ввести ключевое слово");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!props.isSavedMoviesPage && searchedMovie.length < 1) {
      setError("Нужно ввести ключевое слово");
    } else {
      props.onSearchMovie(searchedMovie);
      setError("");
    }
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
