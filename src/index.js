import {
  profileName,
  profileJob,
  profileAvatar,
  editButton,
  addButton,
  popupEdit,
  popupNewCard,
  popupImage,
  popupAvatar,
  popupConfirm,
  closeButtons,
  cardsContainer,
  confirmForm,
  avatarEditButton
} from './scripts/constants.js';

import { openPopup, closePopup } from './scripts/modal.js';
import {
  createCard,
  handleLikeCard,
  deleteCardFromDOM
} from './scripts/card.js';
import './pages/index.css';
import { enableValidation, preparePopup } from './scripts/validation.js';
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addNewCard,
  updateAvatar,
  deleteCard
} from './scripts/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

let userId = null;
let cardToDelete = null;
let cardIdToDelete = null;

// ===== Загрузка данных =====
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    cards.reverse().forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        setCardForDeletion,
        handleLikeCard,
        handleCardImageClick,
        userId
      );
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => console.error('Ошибка загрузки данных:', err));

// ====== Обработчики попапов ======
editButton.addEventListener('click', () => {
  const nameInput = popupEdit.querySelector('.popup__input_type_name');
  const jobInput = popupEdit.querySelector('.popup__input_type_description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  preparePopup(popupEdit, validationConfig);
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  popupNewCard.querySelector('.popup__form').reset();
  preparePopup(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});

avatarEditButton.addEventListener('click', () => {
  popupAvatar.querySelector('.popup__form').reset();
  preparePopup(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    if (popup) closePopup(popup);
  });
});

// ===== Обработчики форм =====
popupEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = popupEdit.querySelector('.popup__input_type_name');
  const jobInput = popupEdit.querySelector('.popup__input_type_description');
  const submitButton = popupEdit.querySelector('.popup__button');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';

  updateUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch(err => console.error('Ошибка обновления профиля:', err))
    .finally(() => submitButton.textContent = originalText);
});

popupNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = popupNewCard.querySelector('.popup__input_type_card-name');
  const linkInput = popupNewCard.querySelector('.popup__input_type_url');
  const submitButton = popupNewCard.querySelector('.popup__button');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Создание...';

  addNewCard(nameInput.value, linkInput.value)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        setCardForDeletion,
        handleLikeCard,
        handleCardImageClick,
        userId
      );
      cardsContainer.prepend(cardElement);
      closePopup(popupNewCard);
      popupNewCard.querySelector('.popup__form').reset();
    })
    .catch(err => console.error('Ошибка создания карточки:', err))
    .finally(() => submitButton.textContent = originalText);
});

popupAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const avatarInput = popupAvatar.querySelector('.popup__input_type_avatar');
  const submitButton = popupAvatar.querySelector('.popup__button');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';

  updateAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupAvatar);
      popupAvatar.querySelector('.popup__form').reset();
    })
    .catch(err => console.error('Ошибка обновления аватара:', err))
    .finally(() => submitButton.textContent = originalText);
});

confirmForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const button = confirmForm.querySelector('.popup__button');
  const defaultText = button.textContent;
  button.textContent = 'Удаление...';

  deleteCard(cardIdToDelete)
    .then(() => {
      
      if (cardToDelete) {
        deleteCardFromDOM(cardToDelete);  
      }
      closePopup(popupConfirm);
      cardToDelete = null;
      cardIdToDelete = null;
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    })
    .finally(() => {
      button.textContent = defaultText;
    });
});
function handleCardImageClick(cardData) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const captionElement = popupImage.querySelector('.popup__caption');

  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  captionElement.textContent = cardData.name;

  openPopup(popupImage);
}

function setCardForDeletion(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openPopup(popupConfirm);
}

// экспортируем переменные для удаления



import logoPath from './images/logo.svg';
document.querySelector('.header__logo').src = logoPath;