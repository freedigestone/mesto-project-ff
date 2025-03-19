import { editButton, addButton, popupEdit, popupNewCard, popupImage, closeButtons, cardsContainer } from "./constants.js";
import { createCard } from "./card.js";

export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
  document.addEventListener('keydown', closePopupOnEscape);
  document.addEventListener('click', closePopupOnOverlayClick);
}

function closePopup(popup) {
  popup && popup.classList.contains('popup_is-opened') 
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
      document.removeEventListener('keydown', closePopupOnEscape);
      document.removeEventListener('click', closePopupOnOverlayClick);
     
    }, 600); // Задержка должна быть равна времени анимации (0.6s = 600ms)
}

closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    if (popup) {
      closePopup(popup);
    }
  });
});

function closePopupOnEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function closePopupOnOverlayClick(event) {
  if (!event.target.closest('.popup__content')) {
    const popup = event.target.closest('.popup');
    if (popup) {
      closePopup(popup);
    } 
  }
}

export function setModalListeners() {
  const formElement = document.querySelector('.popup__form[name="edit-profile"]');
  const addCardFormElement = document.querySelector('.popup__form[name="new-place"]');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  const placeNameInput = document.querySelector('.popup__input_type_card-name');
  const linkInput = document.querySelector('.popup__input_type_url');
  const altTextInput = document.querySelector('.popup__input_type_card-name[placeholder="Alt для картиник"]');
  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');

  function fillForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    closePopup(popupEdit);
  }

  formElement.addEventListener('submit', handleFormSubmit);

  // Открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
  const popupEdit = document.querySelector('.popup_type_edit');
  openPopup(popupEdit);
  fillForm();
});

  function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = placeNameInput.value;
    const cardLink = linkInput.value;
    const cardAlt = altTextInput.value;
  
    const newCard = createCard(
      { name: cardName, link: cardLink, alt: cardAlt },
      function(card) {
        card.remove();
      },
      function(likeButton) {
        likeButton.classList.toggle('card__like-button_is-active');
      },
      function(cardData) {
        const popupImageElement = popupImage.querySelector('.popup__image');
        const popupCaptionElement = popupImage.querySelector('.popup__caption');
  
        popupImageElement.src = cardData.link;
        popupImageElement.alt = cardData.name;
        popupCaptionElement.textContent = cardData.name;
  
        openPopup(popupImage);
      }
    );
  
    cardsContainer.prepend(newCard);
    closePopup(popupNewCard);
    addCardFormElement.reset();
  }

  addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

  // Открытие попапа добавления карточки
addButton.addEventListener('click', () => {
  const popupNewCard = document.querySelector('.popup_type_new-card');
  openPopup(popupNewCard);
});

  // Открытие попапа просмотра картинки
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('card__image')) {
    const popupImageSrc = event.target.src;
    const popupImageAlt = event.target.alt;
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaptionElement = popupImage.querySelector('.popup__caption');

    popupImageElement.src = popupImageSrc;
    popupImageElement.alt = popupImageAlt;
    popupCaptionElement.textContent = popupImageAlt;

    openPopup(popupImage);
  }
});
}