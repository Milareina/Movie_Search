import { loadHeader } from "./modules/header";
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
import { getMovies, toggleBtn } from "./modules/home";
import { loadFooter } from "./modules/footer";
document.addEventListener("DOMContentLoaded", () => {
  getPopularMovies();
  loadHeader();
  loadSidebar();
  loadFooter();
  getMovies();
  toggleBtn();
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
