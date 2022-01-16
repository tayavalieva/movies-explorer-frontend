import "./MoviesCard.css";
import Image from "../../images/card-img2.jpg";

function MoviesCard() {
  return (
    <li className="card">
      <img src={Image} alt="33 слова о дизайне" className="card__img"></img>
      <div className="card__caption">
        <button className="card__save-button" type="button">
          Сохранить
        </button>
        <h2 className="card__title">33 слова о дизайне</h2>
        <p className="card__info">1ч 17м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
