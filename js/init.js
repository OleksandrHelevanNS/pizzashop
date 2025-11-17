import { pizzas } from "./mocks.js";
import { initPizzaCards, resetCards, renderNextBatch } from "./pizza-cards.js";
import { initFilters, setActiveFilterButton } from "./filters.js";
import { initPopularPizzas } from "./popular-cards.js";

document.addEventListener("DOMContentLoaded", () => {
    initPizzaCards();
    initFilters();
    initPopularPizzas();
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get("filter") || "Show All";

    let filtered = pizzas;
    if (urlFilter !== "Show All") {
        filtered = pizzas.filter(p => p.type === urlFilter);
    }

    resetCards(filtered, urlFilter);
    renderNextBatch();
    setActiveFilterButton(urlFilter);
});
