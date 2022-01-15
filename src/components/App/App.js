import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
