
import { setModalListeners } from './scripts/modal.js';
import { renderCards } from './scripts/card.js';
import './pages/index.css';


document.addEventListener('DOMContentLoaded', () => {
  setModalListeners();
  renderCards();
});