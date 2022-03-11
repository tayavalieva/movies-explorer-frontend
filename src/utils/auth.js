//export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "https://api2.movie-explorer.nomoredomains.rocks";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(_handlelResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(_handlelResponse);
};

export const checkUserToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(_handlelResponse);
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "DELETE",
    credentials: "include",
  }).then(_handlelResponse);
};

function _handlelResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  return res.json();
}
