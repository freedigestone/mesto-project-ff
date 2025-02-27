const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, onDelete) { 
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
    
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name; 

  deleteButton.addEventListener('click', function() {
    onDelete(card);
  });

  return card;  
}

function renderCards() {
  initialCards.forEach(function(cardData) {
    const cardElement = createCard(cardData, function(card) {
      card.remove();
    });
    cardsContainer.append(cardElement);
  });
}

renderCards();