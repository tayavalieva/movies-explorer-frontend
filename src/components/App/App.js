import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <div className="App">
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies />
          </Route>
          <Profile />
          <Login />
          <Register />
          <NotFound />
        </div>
      </div>
    </div>
  );
}

export default App;
