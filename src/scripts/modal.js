

export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
  document.addEventListener('keydown', closePopupOnEscape);
  document.addEventListener('click', closePopupOnOverlayClick);
}

export function closePopup(popup) {
  popup && popup.classList.contains('popup_is-opened') 
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
      document.removeEventListener('keydown', closePopupOnEscape);
      document.removeEventListener('click', closePopupOnOverlayClick);
     
    }, 600); // Задержка должна быть равна времени анимации (0.6s = 600ms)
}


function closePopupOnEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

