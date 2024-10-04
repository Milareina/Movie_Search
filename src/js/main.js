//Сюда импортируйте свои модули из папаки modules и вызывайте функции

import { loadSidebar } from './modules/sidebar';

document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
});
