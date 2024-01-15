//const baseUrl = "http://localhost:3000";
const baseUrl = "https://api.inna.nomoredomainsmonster.ru";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
}

export function registration(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => checkResponse(res));
}

export function authorization(password, email) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      password: password, 
      email: email, 
    })
  })
  .then((res) => checkResponse(res));
}

export function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }})
  .then((res) => checkResponse(res));
}
