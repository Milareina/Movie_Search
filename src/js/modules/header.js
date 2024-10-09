document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("theme-toggle");
  const body = document.body;

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
    } else {
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
    }
  });
});
//картинка фильма в home
const apiKey = "b6027775-465a-49ee-aecc-0731f7b27b31";
const apiUrl =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/images?type=STILL&page=1";

async function getRandomMovie() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });

    const data = await response.json();

    const movies = data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    document.querySelector(".movie__title").textContent = randomMovie.title;
    document.querySelector(".movie__description").textContent =
      randomMovie.overview;
    const posterPath = `https://avatars.mds.yandex.net/get-kinopoisk-image/1898899/cdd38047-43f1-4e0d-9c70-3cbaaf1a9857/orig${randomMovie.backdrop_path}`;
    document.querySelector(
      ".movie"
    ).style.backgroundImage = `url(${posterPath})`;
  } catch (error) {
    console.error("Ошибка при получении данных", error);
  }
}

getRandomMovie();
