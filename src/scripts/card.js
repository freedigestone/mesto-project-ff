import { initialCards, cardsContainer, cardTemplate, popupImage } from './constants.js';
import { openPopup } from './modal.js';

export function createCard(cardData, onDelete, onLike, onImageClick ) { 
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', function() {
      onDelete(card);
    });

    likeButton.addEventListener('click', function() {
      onLike(likeButton);
    });

    cardImage.addEventListener('click', function() {
      if (typeof onImageClick === 'function') {
        onImageClick(cardData);
      } 
    });

    return cardElement;  
}

export function renderCards() {
    initialCards.forEach(function(cardData) {
        const cardElement = createCard(
            cardData,
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
        cardsContainer.append(cardElement);
    });
}

