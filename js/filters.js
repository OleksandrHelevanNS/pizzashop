import { pizzaTypeFilter } from "./constants.js";
import { pizzas } from "./mocks.js";
import { renderNextBatch, resetCards } from "./pizza-cards.js";

export function initFilters() {
    const buttonsContainer = document.querySelector(".menu-content__buttons");

    const params = new URLSearchParams(window.location.search);
    const currentFilter = params.get("filter") || "Show All";

    pizzaTypeFilter.forEach((type) => {
        const btn = document.createElement("button");
        btn.classList.add("buttons__menu-filter-btn");
        btn.textContent = type;
        if (type === currentFilter) btn.classList.add("buttons__menu-filter-btn--active");

        btn.addEventListener("click", () => {
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("filter", type);
            window.history.replaceState({}, "", `?${newParams.toString()}`);

            document
                .querySelectorAll(".buttons__menu-filter-btn")
                .forEach((b) => b.classList.remove("buttons__menu-filter-btn--active"));
            btn.classList.add("buttons__menu-filter-btn--active");

            const filtered =
                type === "Show All"
                    ? pizzas
                    : pizzas.filter((p) => p.type === type);

            resetCards(filtered, type);
            renderNextBatch();
        });

        buttonsContainer.appendChild(btn);
    });
}
export function setActiveFilterButton(filter) {
    document
        .querySelectorAll(".buttons__menu-filter-btn")
        .forEach(btn => {
            btn.classList.toggle(
                "buttons__menu-filter-btn--active",
                btn.textContent === filter
            );
        });
}
