import { loadSidebar } from "./modules/sidebar";
import { getRecommendMovies, initEventListeners } from "./modules/search";
import {
  movieListContainer,
  fetchSeries,
  displaySeries,
  updateItemsPerView,
  showNextItems,
} from "./modules/series";

document.addEventListener("DOMContentLoaded", () => {
  loadSidebar();
  initEventListeners();
  getRecommendMovies(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1"
  );
  //   series
  movieListContainer,
    fetchSeries(),
    displaySeries(),
    updateItemsPerView(),
    showNextItems();
});

document.addEventListener("DOMContentLoaded", () => {
  fetchSeries();
  const arrow = document.getElementById("arrow");
  arrow.addEventListener("click", showNextItems);

  window.addEventListener("resize", () => {
    updateItemsPerView();
    showNextItems();
  });
});
