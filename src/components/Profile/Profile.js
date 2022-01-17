import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__greeting">Привет, Виталий!</h2>
      <form className="profile__form-container">
        <div className="profile__input-container">
          <p className="profile__input-label-name">Имя</p>
          <input className="profile__input"></input>
        </div>
        <div className="profile__input-container">
          <p className="profile__input-label-name">Email</p>
          <input className="profile__input"></input>
        </div>
        <button className="profile__form-submit-btn" tupe="submit">
          Редактировать
        </button>
      </form>
      <button type="button" className="profile__exit-btn">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;