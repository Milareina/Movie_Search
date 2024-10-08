const container = document.querySelector(".popular-page__content");
const arrow_button = document.querySelector(".arrow");
let popularMovies = [];

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
    renderPopularMovies(0, 5);
  } catch (error) {
    document.querySelector(
      ".popular-page__title"
    ).innerHTML = `Кажется, что-то пошло не так: ${error.message}`;
  }
}

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

arrow_button.addEventListener("click", next);

function next() {
  let click = false;
  if (!click) {
    container.innerHTML = "";
    renderPopularMovies(5, 10);
    click = true;
  }
  if (click) {
    container.innerHTML = "";
    renderPopularMovies(10, 15);
  }
}

/*container.innerHTML = "";
renderPopularMovies(15, 20);


offset = (offset+limit)%20/*/
