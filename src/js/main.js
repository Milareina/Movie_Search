import { loadSidebar } from "./modules/sidebar";
import { getRecommendMovies, initEventListeners } from "./modules/search";
import { getPopularMovies } from "./modules/popular";

document.addEventListener("DOMContentLoaded", () => {
  loadSidebar();
  initEventListeners();
  getRecommendMovies(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1"
  );
});

getPopularMovies();
