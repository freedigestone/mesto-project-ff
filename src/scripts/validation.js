function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  // Если ошибка по паттерну, то показываем кастомное сообщение
  if (inputElement.validity.patternMismatch) {
    const customMessage = inputElement.dataset.errorMessage || ''; // Берем сообщение из атрибута data-error-message
    inputElement.setCustomValidity(customMessage);
  } else {
    inputElement.setCustomValidity(''); // Если ошибки нет, сбрасываем кастомное сообщение
  }

  // Показываем ошибку, если поле невалидно
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Проверим состояние кнопки при инициализации
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config); // обязательно первым
      toggleButtonState(inputList, buttonElement, config);   // затем обновим кнопку
    });
  });
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity(''); // Сброс кастомных сообщений
    hideInputError(formElement, inputElement, config); // Скрытие ошибок
  });

  toggleButtonState(inputList, buttonElement, config);
}

export function preparePopup(popup, config) {
  const form = popup.querySelector(config.formSelector);
  if (form) {
    clearValidation(form, config);
  }
}
