import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
import Preloader from "../Preloader/Preloader";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchResultMessage, setSearchResultMessage] = useState("");
  const [allMovies, setAllMovies] = useState([]);

  const [searchedMovies, setSearchedMovies] = useState(() => {
    const movies = localStorage.getItem("searchedMovies");
    return movies == null ? [] : JSON.parse(movies);
  });

  const [savedMovies, setSavedMovies] = useState([]);
  const [showShortMovies, setShowShortMovies] = useState(false);

  const history = useHistory();
  const location = useLocation();

  //check user info on logged in status change

  React.useEffect(() => {
    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((error) => console.log("get user error:", error));
  }, [isLoggedIn]);

  const [isActivePreloader, setIsActivePreloader] = useState(false);

  //check if logged in
  const tokenCheck = (url) => {
    setIsActivePreloader(true);
    auth
      .checkUserToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          history.push(url);
        }
      })
      .catch((error) => console.log("Render error:", error))
      .finally(() => setIsActivePreloader(false));
  };

  // double token check
  React.useEffect(() => tokenCheck(location.pathname), []);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
        tokenCheck("/movies");
      })
      .catch((error) => console.log("login error:", error));
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        tokenCheck("/movies");
      })
      .catch((error) => {
        console.log("Registration error:", error);
      });
  }

  function resetLocalStorage() {
    localStorage.removeItem("allMovies");
    localStorage.removeItem("searchedMovies");
  }

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        resetLocalStorage();
        setSearchedMovies([]);
        history.push("/");
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  }

  const [updateProfileMessage, setUpdateProfileMessage] = useState("");

  function handleUpdateUser(userData) {
    mainApi
      .setNewUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData.data);
        setUpdateProfileMessage("Информация успешно обновлена");
      })
      .catch((error) => {
        console.log("User update error:", error);
        setUpdateProfileMessage(
          "Не удалось обновить профиль, попробуйте еще раз"
        );
      });
  }

  //reset profile update message
  useEffect(() => {
    if (updateProfileMessage) {
      const timeout = setTimeout(() => setUpdateProfileMessage(""), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [updateProfileMessage]);

  //get all movies and save them to the state and to the local storage when a user logs in
  useEffect(() => {
    moviesApi
      .getAllMovies()
      .then((allMovies) => {
        setAllMovies(allMovies);
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(err);
        setSearchResultMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }, [currentUser]);

  //get user's movies from my server and write them to state
  // when user changes (opens page for the fist time)

  function updateSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        if (currentUser != null) {
          const userSavedMovies = savedMovies.data.filter(
            (movie) => movie.owner === currentUser._id
          );
          setSavedMovies(userSavedMovies);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSavedMovies();
  }, [currentUser]);

  //find movies by users' keyword and save them to searchedMovies and local storage
  function searchMovie(name, isSavedMoviesPage) {
    const keyword = name.toLowerCase();
    const moviesList = isSavedMoviesPage ? savedMovies : allMovies;
    const searchedMovies = allMovies.filter(
      (movie) =>
        (movie.nameRU != null &&
          movie.nameRU.toLowerCase().includes(keyword)) ||
        (movie.nameEN != null && movie.nameEN.toLowerCase().includes(keyword))
    );
    if (searchedMovies.length < 1) {
      setSearchResultMessage("Ничего не найдено");
    }
    setSearchedMovies(searchedMovies);
    localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
  }

  //add movies to user's save movies list
  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newSavedMovie) => {
        console.log(newSavedMovie.data);
        if (!newSavedMovie.data) {
          throw new Error("Произошла ошибка");
        } else {
          setSavedMovies([newSavedMovie.data, ...savedMovies]);
        }
      })
      .catch((err) => {
        console.log(`Render error: ${err}`);
      });
  }

  //delete movie from user's saved movies list
  function handleDeleteMovie(movie) {
    const movieId = movie.id || movie.movieId;
    const currentMovie = savedMovies.find((m) => m.movieId === movieId);
    mainApi
      .deleteMovie(currentMovie._id)
      .then(() => {
        updateSavedMovies();
      })
      .catch((err) => {
        console.log(`Render error: ${err}`);
      });
  }
  const shortMovieDuration = 40;

  function toggleCheckBox() {
    //console.log("short movies");
    setShowShortMovies(!showShortMovies);
  }
  console.log("showShortMovies", showShortMovies);

  function filterShortMovies(moviesArray) {
    if (moviesArray.length > 0) {
      return moviesArray.filter((movie) =>
        showShortMovies ? movie.duration <= shortMovieDuration : true
      );
    } else {
      return moviesArray;
    }
  }
  const [isSideModalOpen, setSideModalOpen] = useState(false);

  function handleMenuClick() {
    setSideModalOpen(true);
  }

  function closeSideBar() {
    setSideModalOpen(false);
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

              <Route exact path="/">
                <Main
                  isLoggedIn={isLoggedIn}
                  onMenuClick={handleMenuClick}
                  onCloseSideBar={closeSideBar}
                />
              </Route>

              <ProtectedRoute
                exact
                path="/movies"
                component={Movies}
                isLoggedIn={isLoggedIn}
                allMovies={allMovies}
                searchedMovies={filterShortMovies(searchedMovies)}
                savedMovies={savedMovies}
                onSearchMovie={searchMovie}
                onFilter={toggleCheckBox}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                searchResultMessage={searchResultMessage}
                isSavedMoviesPage={false}
                onMenuClick={handleMenuClick}
                isActivePreloader={isActivePreloader}
              ></ProtectedRoute>

              <ProtectedRoute
                exact
                path="/saved-movies"
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
                onSearch={searchMovie}
                onFilter={toggleCheckBox}
                savedMovies={filterShortMovies(savedMovies)}
                onDeleteMovie={handleDeleteMovie}
                isSavedMoviesPage={true}
                onMenuClick={handleMenuClick}
              ></ProtectedRoute>

              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
                isLoggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
                onMenuClick={handleMenuClick}
                updateMessage={updateProfileMessage}
              ></ProtectedRoute>

              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
            <ModalSidebar isOpen={isSideModalOpen} onClose={closeSideBar} />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
