import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__content">Страница не найдена</p>
      <a className="not-found__link" href="#">
        Назад
      </a>
    </div>
  );
}

export default NotFound;
