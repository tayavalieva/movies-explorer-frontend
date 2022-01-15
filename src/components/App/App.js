import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <div className="App">
          <Header />
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
