import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ModalSidebar from "../ModalSidebar/ModalSidebar";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [moviesPageMessage, setMoviesPageMessage] = useState("");
  const [allMovies, setAllMovies] = useState([]);

  const [searchedMovies, setSearchedMovies] = useState(() => {
    const movies = localStorage.getItem("searchedMovies");
    return movies == null ? [] : JSON.parse(movies);
  });

  const [savedMovies, setSavedMovies] = useState([]);

  const history = useHistory();

  //check user info on logged in status change

  React.useEffect(() => {
    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((error) => console.log("Render error:", error));
  }, [isLoggedIn]);

  //check if logged in
  const tokenCheck = () => {
    auth
      .getUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((error) => console.log("Render error:", error));
  };

  React.useEffect(tokenCheck, [isLoggedIn]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
        tokenCheck();
      })
      .catch((error) => console.log("Render error:", error));
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        tokenCheck();
      })
      .catch((error) => {
        console.log("Render error:", error);
      });
  }

  function resetStorage() {
    localStorage.removeItem("allMovies");
    localStorage.removeItem("searchedMovies");
    localStorage.removeItem("savedMovies");
    setAllMovies([]);
    setSearchedMovies([]);
    setSavedMovies([]);
    setMoviesPageMessage("");
  }

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        resetStorage();
      })
      .catch((error) => {
        console.log("Render error:", error);
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .setNewUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((error) => console.log("Render error:", error));
  }

  //get all movies and save them to the local storage when a user logs in

  useEffect(() => {
    moviesApi
      .getAllMovies()
      .then((allMovies) => {
        setAllMovies(allMovies);
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(err);
        setMoviesPageMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }, [currentUser]);

  console.log(localStorage.getItem("allMovies"), "from local storage from app");

  //find movies by users' keyword and save them to searchedMovies and local storage
  function searchMovie(name) {
    const keyword = name.toLowerCase();
    const searchedMovies = allMovies.filter(
      (movie) =>
        (movie.nameRU != null &&
          movie.nameRU.toLowerCase().includes(keyword)) ||
        (movie.nameEN != null && movie.nameEN.toLowerCase().includes(keyword))
    );
    if (searchedMovies.length < 1) {
      setMoviesPageMessage("Ничего не найдено");
    }
    setSearchedMovies(searchedMovies);
    localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
  }

  //add movies to user's save movies list and local storage

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newSavedMovie) => {
        console.log(newSavedMovie);
        if (!newSavedMovie) {
          throw new Error("Произошла ошибка");
        } else {
          setSavedMovies(newSavedMovie);
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(
              (newSavedMovie = [newSavedMovie.movie, ...savedMovies])
            )
          );
        }
      })
      .catch((err) => {
        console.log(`Render error: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <div className="App">
            <Switch>
              <Route exact path="/signin">
                <Login onLogin={handleLogin} />
              </Route>
              <Route exact path="/signup">
                <Register onRegister={handleRegister} />
              </Route>

              <ProtectedRoute exact path="/" component={Main}></ProtectedRoute>

              <ProtectedRoute
                exact
                path="/movies"
                component={Movies}
                isLoggedIn={isLoggedIn}
                allMovies={allMovies}
                searchedMovies={searchedMovies}
                savedMovies={savedMovies}
                onSearchMovie={searchMovie}
                onSaveMovie={handleSaveMovie}
                moviesPageMessage={moviesPageMessage}
              ></ProtectedRoute>

              <ProtectedRoute
                exact
                path="/saved-movies"
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
              ></ProtectedRoute>

              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
                isLoggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              ></ProtectedRoute>

              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
            <ModalSidebar />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
