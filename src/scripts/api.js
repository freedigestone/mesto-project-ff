// api.js
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
  headers: {
    authorization: 'af9574fd-354d-4100-a9f7-13db4272f351',
    'Content-Type': 'application/json'
  }
};

// Универсальная функция проверки ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получить данные пользователя
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(checkResponse);
};

// Получить карточки
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(checkResponse);
};

// Обновить профиль пользователя
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(checkResponse);
};

// Обновить аватар пользователя
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(checkResponse);
};

// Добавить новую карточку
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(checkResponse);
};

// Удалить карточку
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
};

// Лайк / дизлайк карточки
export const toggleLikeCard = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  }).then(checkResponse);
};
