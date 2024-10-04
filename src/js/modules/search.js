// Переменные для отслеживания текущего состояния страницы
let currentIndex = 0;
const moviesPerPage = 5;
let allMovies = [];

// Функция для получения рекомендованных фильмов
export async function getRecommendMovies(url) {
    const apiKey = "a72994a0-2897-409b-943f-b58b813ec6ce";

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.items || responseData.items.length === 0) {
            throw new Error("Тут пусто :(");
        }

        allMovies = responseData.items;
        renderRecommendCard();
    } catch (error) {
        document.querySelector('.recommend h2.recommend__title').innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}

// Функция для рендеринга карточек фильмов
export function renderRecommendCard() {
    const recommendMovies = document.querySelector(".recommend__items");
    const moviesToShow = allMovies.slice(currentIndex, currentIndex + moviesPerPage);

    moviesToShow.forEach(movie => {
        const movieElement = createMovieElement(movie);
        recommendMovies.appendChild(movieElement);
    });

    currentIndex += moviesPerPage;

    if (currentIndex >= allMovies.length) {
        toggleButtonVisibility(false);
    }
}

// Функция для создания элемента фильма
function createMovieElement(movie) {
    const movieElement = document.createElement("a");
    movieElement.classList.add("recommend__item");
    movieElement.innerHTML = `
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        <h3 class="recommend__item-title">${movie.nameRu}</h3>
        <div class="recommend__item-info">
            <p class="recommend__item-year">${movie.year},</p>
            <p class="recommend__item-genre">${movie.genres.map(genre => `${genre.genre}`).join(', ')}</p>
        </div>
    `;
    return movieElement;
}

// Функция для переключения видимости кнопок
function toggleButtonVisibility(isVisible) {
    document.querySelector(".recommend__button").style.display = isVisible ? 'block' : 'none';
    document.querySelector(".scroll-to-top").style.display = isVisible ? 'none' : 'block';
}

// Инициализация обработчиков событий
export function initEventListeners() {
    document.querySelector(".recommend__button").addEventListener("click", renderRecommendCard);

    document.querySelector(".search-page__scroll-to-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        const scrollTopButton = document.querySelector(".search-page__scroll-to-top");
        scrollTopButton.style.display = window.scrollY > 600 ? 'block' : 'none';
    });
}
