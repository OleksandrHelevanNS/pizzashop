import { pizzas } from "./mocks.js";
import { initPizzaCards, resetCards, renderNextBatch } from "./pizza-cards.js";
import { initFilters } from "./filters.js";
import { initPopularPizzas } from "./popular-cards.js";

document.addEventListener("DOMContentLoaded", () => {
    initPizzaCards();
    initFilters();
    initPopularPizzas();

    resetCards(pizzas, "Show All");
    renderNextBatch();
});
