import { BASE_URL } from "./auth";

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  setNewUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._handleResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._handleResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}${"/movies"}/${movieId}`, {
      //fetch(`${this._url}/movies`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default mainApi;
