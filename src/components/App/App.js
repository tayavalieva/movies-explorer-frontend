import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <div className="App">
          <Header />
          <Main />
          <Movies />
          <SavedMovies />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
