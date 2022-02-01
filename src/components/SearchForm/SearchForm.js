import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
        ></input>
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
