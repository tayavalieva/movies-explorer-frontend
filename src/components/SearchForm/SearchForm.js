import "./SearchForm.css";
import React, { useState } from "react";

function SearchForm(props) {
  const [searchedMovie, setSearchedMovie] = useState(props.keyword);
  const [error, setError] = useState("");

  function handleSearchMovie(e) {
    setSearchedMovie(e.target.value);
    if (!props.isSavedMoviesPage && e.target.value.length < 1) {
      setError("Please enter a keyword");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!props.isSavedMoviesPage && searchedMovie.length < 1) {
      setError("Please enter a keyword");
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
          placeholder="Film"
          onChange={handleSearchMovie}
          required
        ></input>

        <button
          className="search-form__button"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
      <span className="search-form__input-error">{error}</span>
    </section>
  );
}

export default SearchForm;
