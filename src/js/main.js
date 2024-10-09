import { loadSidebar } from "./modules/sidebar";
import { getRecommendMovies, initEventListeners, loadHistoryFromLocalStorage } from "./modules/search";
import {
  movieListContainer,
  fetchSeries,
  displaySeries,
  updateItemsPerView,
  showNextItems,
} from "./modules/series";

document.addEventListener("DOMContentLoaded", () => {
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


