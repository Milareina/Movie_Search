import { loadSidebar } from "./modules/sidebar";

import { movies } from "./modules/movies";

import {
  getRecommendMovies,
  initEventListeners,
  loadHistoryFromLocalStorage,
} from "./modules/search";

import { getPopularMovies } from "./modules/popular";
import { initSeriesModule } from "./modules/series";
import { getMovies } from "./modules/home";

document.addEventListener("DOMContentLoaded", () => {
  const isSearchPage = document.querySelector(".search-page") !== null;

  if (isSearchPage) {
    loadSidebar();
    loadHistoryFromLocalStorage();
    initEventListeners();
    getRecommendMovies();
  } else {
    loadSidebar();
    getMovies();
    getPopularMovies();
    initSeriesModule();
  }
});

movies();

window.addEventListener("resize", () => {
  updateItemsPerView();
  showNextItems();
});
