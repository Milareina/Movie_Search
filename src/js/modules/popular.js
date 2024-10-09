const container = document.querySelector(".popular-page__content");
const arrow_buttonNext = document.querySelector(".arrow");
const arrow_buttonPrev = document.querySelector(".arrow-prev");
let popularMovies = [];
let offset = 0; /* Переменная начальной точки отсчета фильмов */
let limit = 5; /* Переменная лимита фильмов за раз*/

/* Функция получения данных о фильмах с api */
export async function getPopularMovies() {
  try {
    const response = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "dd146e83-6098-4c58-bea6-a52186942de2",
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await response.json();
    popularMovies = responseJson.items;
    renderPopularMovies(offset, limit);
  } catch (error) {
    document.querySelector(
      ".popular-page__title"
    ).innerHTML = `Кажется, что-то пошло не так: ${error.message}`;
    arrow_buttonNext.style.display = "none";
  }
}

/* Функция визуализации каждых последующих или предыдущих пяти фильмов */
function renderPopularMovies(minIndex, maxIndex) {
  for (let i = minIndex; i < maxIndex; i++) {
    let movieWrapper = document.createElement("div");
    movieWrapper.classList.add("popular-page__content-item");
    let image = document.createElement("img");
    image.classList.add("popular-page__movie-image");
    image.src = `${popularMovies[i].posterUrlPreview}`;
    image.alt = `${popularMovies[i].nameRu}`;
    let p1 = document.createElement("p");
    p1.classList.add("popular-page__movie-info");
    p1.textContent = `${popularMovies[i].nameRu} (${popularMovies[i].year})`;
    let p2 = document.createElement("p");
    p2.classList.add("popular-page__movie-genres");
    p2.textContent = `${popularMovies[i].genres
      .map((genre) => `${genre.genre}`)
      .join(", ")}`;
    movieWrapper.append(image, p1, p2);
    container.append(movieWrapper);
  }
}

/* Функции видимости и переключения кнопок 'следующая-предыдущая страницы' */
arrow_buttonNext.addEventListener("click", next);
arrow_buttonPrev.addEventListener("click", previous);
arrow_buttonPrev.style.display = "none";

function next() {
  container.innerHTML = "";
  offset = offset + limit;
  renderPopularMovies(offset, offset + limit);
  arrow_buttonPrev.style.display = "block";
  if (offset == 15) {
    arrow_buttonNext.style.display = "none";
  }
}

function previous() {
  container.innerHTML = "";
  offset = offset - limit;
  renderPopularMovies(offset, offset + limit);
  if (offset == 0) {
    arrow_buttonPrev.style.display = "none";
    arrow_buttonNext.style.display = "block";
  }
}
