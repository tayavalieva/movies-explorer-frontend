import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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

  function handleUpdateUser(userData) {
    mainApi
      .setNewUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((error) => console.log("Render error:", error));
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
