const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const handlelResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getAllMovies = () => {
  return fetch(`${MOVIES_URL}`, {
    method: "GET",
    headers: headers,
  }).then((res) => {
    return handlelResponse(res);
  });
};
