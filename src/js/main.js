//Сюда импортируйте свои модули из папаки modules и вызывайте функции

import { loadSidebar } from './modules/sidebar';
import { setupSearchRedirect } from './modules/search';

document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
    setupSearchRedirect();
});
