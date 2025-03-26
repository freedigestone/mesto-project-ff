import { initialCards, cardsContainer, editButton, addButton, popupEdit, popupNewCard, popupImage, closeButtons } from './scripts/constants.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { createCard, handleRemoveCard, handleLikeCard } from './scripts/card.js';
import './pages/index.css';

// Функция для обработки клика на изображение карточки
function handleOpenPopup(cardData) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');

  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaptionElement.textContent = cardData.name;

  openPopup(popupImage);
}

function renderCards() {
  initialCards.forEach(function(cardData) {
    const cardElement = createCard( 
      cardData, 
      handleRemoveCard, 
       handleLikeCard,
       handleOpenPopup
    );
    cardsContainer.append(cardElement);
  });
}

function setModalListeners() {
  const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
  const addCardFormElement = document.querySelector('.popup__form[name="new-place"]');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  const placeNameInput = document.querySelector('.popup__input_type_card-name');
  const linkInput = document.querySelector('.popup__input_type_url');
  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');

  function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }

  function submitProfileForm(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    closePopup(popupEdit);
  }

  editProfileForm.addEventListener('submit', submitProfileForm);

  // Открытие попапа редактирования профиля
  editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    fillProfileForm();
  });

  function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = placeNameInput.value;
    const cardLink = linkInput.value;

    const newCard = createCard(
      { name: cardName, link: cardLink },
      handleRemoveCard,
      handleLikeCard,
      handleOpenPopup
    );
    
    
    newCard.querySelector('.card__image').addEventListener('click', () => {
      handleOpenPopup({ name: cardName, link: cardLink });

      if (typeof onImageClick === 'function') { 
        cardImage.addEventListener('click', function() { 
          onImageClick(cardData); 
         })
     }
    });

    cardsContainer.prepend(newCard);
    closePopup(popupNewCard);
    addCardFormElement.reset();
  }

  addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

  // Открытие попапа добавления карточки
  addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
  });
}

closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    if (popup) {
      closePopup(popup);
    }
  });
});

setModalListeners();
renderCards();