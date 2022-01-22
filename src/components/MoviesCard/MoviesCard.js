import "./MoviesCard.css";
import savedMoviesList from "../../utils/savedMoviesList";
console.log(savedMoviesList);

function MoviesCard({ movie, onSaveClick }) {
  const isSaved = savedMoviesList.some((m) => m.id === movie.id);

  const saveButtonClassName = `card__save-button ${
    isSaved ? "card__save-button_disabled" : ""
  }`;

  const savedIconClassName = `card__saved-icon ${
    isSaved ? "card__saved-icon_disabled" : ""
  }`;

  function handleSaveClick() {
    onSaveClick();
  }

  return (
    <li className="card">
      <img src={movie.image} alt={movie.nameRU} className="card__img"></img>
      <div className="card__caption">
        <button
          className={saveButtonClassName}
          type="button"
          onClick={handleSaveClick}
        >
          Сохранить
        </button>
        <div className={savedIconClassName}></div>
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__info">1ч 17м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
