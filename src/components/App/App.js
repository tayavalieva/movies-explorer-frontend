import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        history.push("signin");
      })
      .catch((error) => {
        console.log("Render error:", error);
      });
  }

  const tokenCheck = () => {
    auth
      .getUserContent()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((error) => console.log("Render error:", error));
  };

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(tokenCheck())
      .catch((error) => console.log("Render error:", error));
  }

  return (
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
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
            ></ProtectedRoute>

            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            ></ProtectedRoute>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <ModalSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
