import { cardTemplate } from './constants.js';
import { toggleLikeCard } from './api.js';


// удаление 

export function deleteCardFromDOM(cardElement) {
  if (cardElement && cardElement.remove) {
    cardElement.remove();
  }
}

// лайк
export function handleLikeCard(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  toggleLikeCard(cardId, isLiked)
    .then((updatedCard) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error('Ошибка при смене лайка:', err);
    });
}

// создание карточки
export function createCard(cardData, onDeleteClick, onLike, onImageClick, currentUserId) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // если пользователь уже лайкнул
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // кнопка удаления только для своих карточек
  if (cardData.owner._id === currentUserId) {
    deleteButton.addEventListener('click', () => {
      onDeleteClick(card, cardData._id);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', () =>
    onLike(cardData._id, likeButton, likeCount)
  );

  if (typeof onImageClick === 'function') {
    cardImage.addEventListener('click', () => onImageClick(cardData));
  }

  return cardElement;
}
