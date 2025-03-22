import { cardTemplate } from './constants.js';

// удаление
export function handleRemoveCard(card) {
  card.remove();
}

// лайк
export function handleLikeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// создание
export function createCard(cardData, onDelete, onLike) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    onDelete(card);
  });

  likeButton.addEventListener('click', () => {
    onLike(likeButton);
  });

  return cardElement;
}