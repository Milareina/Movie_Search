import { loadSidebar } from "./modules/sidebar";
import { getPopularMovies } from "./modules/popular";
import {
  getRecommendMovies,
  initEventListeners,
  loadHistoryFromLocalStorage,
} from "./modules/search";
import {
  movieListContainer,
  fetchSeries,
  displaySeries,
  updateItemsPerView,
  showNextItems,
} from "./modules/series";
import { getMovies } from "./modules/header";

document.addEventListener("DOMContentLoaded", () => {
  getMovies();
  loadSidebar();
  loadHistoryFromLocalStorage();
  initEventListeners();
  getRecommendMovies();
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

getPopularMovies();
