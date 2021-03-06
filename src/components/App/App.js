import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import { shortMovieDuration } from "../../utils/constants";
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

  const [searchResultMessage, setSearchResultMessage] = useState("");
  const [allMovies, setAllMovies] = useState([]);

  const [searchedMovies, setSearchedMovies] = useState(() => {
    const movies = localStorage.getItem("searchedMovies");
    return movies == null ? [] : JSON.parse(movies);
  });

  const [keyword, setKeyword] = useState(() => {
    const keyword = localStorage.getItem("keyword");
    return keyword == null ? "" : keyword;
  });

  const [showShortMovies, setShowShortMovies] = useState(() => {
    const showShortMoviesStatus = localStorage.getItem("showShortMovies");
    return showShortMoviesStatus == null
      ? false
      : JSON.parse(showShortMoviesStatus);
  });

  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesKeyword, setSavedMoviesKeyword] = useState("");

  const [updateProfileMessage, setUpdateProfileMessage] = useState("");
  const [isSideModalOpen, setSideModalOpen] = useState(false);

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

  // set active Preloader when token is being checked
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

  // token check when page is opened
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
        handleLogin(email, password);
      })
      .catch((error) => {
        console.log("Registration error:", error);
      });
  }

  function resetLocalStorage() {
    localStorage.removeItem("allMovies");
    localStorage.removeItem("searchedMovies");
    localStorage.removeItem("keyword");
    localStorage.removeItem("showShortMovies");
    localStorage.removeItem("savedMovies");
  }

  function resetState() {
    setIsLoggedIn(false);
    setAllMovies([]);
    setSearchedMovies([]);
    setKeyword("");
    setShowShortMovies(false);
    setSavedMovies([]);
  }

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        resetLocalStorage();
        resetState();
        history.push("/");
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .setNewUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData.data);
        setUpdateProfileMessage("???????????????????? ?????????????? ??????????????????");
      })
      .catch((error) => {
        console.log("User update error:", error);
        setUpdateProfileMessage(
          "???? ?????????????? ???????????????? ??????????????, ???????????????????? ?????? ??????"
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
          "???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????"
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
          localStorage.setItem("savedMovies", JSON.stringify(userSavedMovies));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSavedMovies();
  }, [currentUser]);

  function findMovie(keyword, moviesList) {
    const foundMoviesList = moviesList.filter(
      (movie) =>
        (movie.nameRU != null &&
          movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) ||
        (movie.nameEN != null &&
          movie.nameEN.toLowerCase().includes(keyword.toLowerCase()))
    );

    return foundMoviesList;
  }

  // /movies page search: find movies by users' keyword and save them to searchedMovies and local storage
  function handleMovieSearch(name) {
    const foundMoviesList = findMovie(name, allMovies);
    if (foundMoviesList.length < 1) {
      setSearchResultMessage("???????????? ???? ??????????????");
    }

    setSearchedMovies(foundMoviesList);
    localStorage.setItem("searchedMovies", JSON.stringify(foundMoviesList));
    localStorage.setItem("keyword", name);
    localStorage.setItem("showShortMovies", JSON.stringify(showShortMovies));
    setKeyword(name);
  }

  // /saved-movies search:
  function handleSavedMovieSearch(name) {
    const moviesList = localStorage.getItem("savedMovies");
    const foundMoviesList = findMovie(name, JSON.parse(moviesList));

    if (foundMoviesList.length < 1) {
      setSearchResultMessage("???????????? ???? ??????????????");
    }
    setSavedMovies(foundMoviesList);
    setSavedMoviesKeyword(name);
  }

  //add movies to user's save movies list
  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newSavedMovie) => {
        if (!newSavedMovie.data) {
          throw new Error("?????????????????? ????????????");
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

  function toggleCheckBox(e) {
    setShowShortMovies(e.target.checked);
  }

  function filterShortMovies(moviesArray) {
    if (moviesArray.length > 0) {
      return moviesArray.filter((movie) =>
        showShortMovies ? movie.duration <= shortMovieDuration : true
      );
    } else {
      return moviesArray;
    }
  }

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
                showShortMovies={showShortMovies}
                savedMovies={savedMovies}
                onSearchMovie={handleMovieSearch}
                keyword={keyword}
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
                onSearchMovie={handleSavedMovieSearch}
                keyword={savedMoviesKeyword}
                onFilter={toggleCheckBox}
                savedMovies={filterShortMovies(savedMovies)}
                onDeleteMovie={handleDeleteMovie}
                isSavedMoviesPage={true}
                onMenuClick={handleMenuClick}
                updateSavedMovies={updateSavedMovies}
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
