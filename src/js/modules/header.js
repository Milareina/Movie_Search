// document.addEventListener("DOMContentLoaded", () => {
//   const toggleSwitch = document.getElementById("theme-toggle");
//   const body = document.body;

//   toggleSwitch.addEventListener("change", function () {
//     if (this.checked) {
//       body.classList.remove("theme-light");
//       body.classList.add("theme-dark");
//     } else {
//       body.classList.remove("theme-dark");
//       body.classList.add("theme-light");
//     }
//   });
// });
// //картинка фильма в home
// const apiKey = "b6027775-465a-49ee-aecc-0731f7b27b31";
// const apiUrl =
//   "https://kinopoiskapiunofficial.tech/api/v2.2/films/images?type=STILL&page=1";

// async function getRandomMovie() {
//   try {
//     const response = await fetch(apiUrl, {
//       headers: {
//         "Content-Type": "application/json",
//         "X-API-KEY": apiKey,
//       },
//     });

//     const data = await response.json();

//     const movies = data.results;
//     const randomMovie = movies[Math.floor(Math.random() * movies.length)];
//     document.querySelector(".movie__title").textContent = randomMovie.title;
//     document.querySelector(".movie__description").textContent =
//       randomMovie.overview;
//     const posterPath = `https://avatars.mds.yandex.net/get-kinopoisk-image/1898899/cdd38047-43f1-4e0d-9c70-3cbaaf1a9857/orig${randomMovie.backdrop_path}`;
//     document.querySelector(
//       ".movie"
//     ).style.backgroundImage = `url(${posterPath})`;
//   } catch (error) {
//     console.error("Ошибка при получении данных", error);
//   }
// }

// getRandomMovie();
const movieContainer = document.querySelector(".movie__content");
const movieContent = document.querySelector(".movie");
const apiMoviesUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const apiKey = "b6027775-465a-49ee-aecc-0731f7b27b31";

let movies = []; // Массив для хранения фильмов
let currentMovieIndex = 0; // Индекс текущего фильма


// Функция для получения данных из API
async function fetchFromApi(url) {
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
        const dataKeys = ['items', 'films', 'genres'];
        const data = dataKeys.find(key => Array.isArray(responseData[key]) && responseData[key].length > 0);

        if (!data) {
            throw new Error("Ничего не найдено");
        }

        return responseData[data];

    } catch (error) {
        return [];
    }
}

//Функция получения фильмов
export async function getMovies() {
    try {
        movies = await fetchFromApi(apiMoviesUrl); // Получаем фильмы
        renderMovie(movies[currentMovieIndex]); // Отображаем первый фильм
        startMovieRotation(); // Запускаем ротацию фильмов
    } catch (error) {
        movieContent.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
    }
}
//Ф-ия создания разметки под фильм
function createMovieElement(movie) {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie__content");

    movieElement.innerHTML = `
        <h1 class="movie__title">${movie.nameRu}</h1>
        <p class="movie__description">${movie.description || "Описание отсутствует."}</p>
        <a href="#" class="movie__watch-btn">Смотреть</a>
    `;
    movieContent.style.backgroundImage = `url(${movie.posterUrl})`; // Меняем фон
    return movieElement;
}
//Ф-ия рендера фильмов 
function renderMovie(movie) {
    movieContainer.innerHTML = ""; // Очищаем предыдущий контент
    const movieElement = createMovieElement(movie); // Создаем элемент фильма
    movieContainer.appendChild(movieElement); // Добавляем фильм в контейнер
}
//Ф-ия запуска показов фильмов через интревал
function startMovieRotation() {
    setInterval(() => {
        currentMovieIndex = (currentMovieIndex + 1) % movies.length; // Увеличиваем индекс и обнуляем 
        renderMovie(movies[currentMovieIndex]); // Рендерим новый фильм
    }, 100000); // Каждые 10 секунд
}