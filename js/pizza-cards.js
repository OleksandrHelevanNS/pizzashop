const pizzaTypeFilter = [
    "Show All",
    "Meat",
    "Vegetarian",
    "Sea products",
    "Mushroom"
];

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".menu-content__buttons");

    pizzaTypeFilter.forEach((type) => {
        const btn = document.createElement("button");
        btn.classList.add("buttons__menu-filter-btn");
        btn.textContent = type;
        container.appendChild(btn);
    });

    const buttons = document.querySelectorAll(".buttons__menu-filter-btn");

    const params = new URLSearchParams(window.location.search);
    const currentFilter = params.get("filter") || "Show All";

    buttons.forEach((btn) => {
        if (btn.textContent === currentFilter) {
            btn.classList.add("buttons__menu-filter-btn--active");
        }

        btn.addEventListener("click", () => {
            buttons.forEach((b) =>
                b.classList.remove("buttons__menu-filter-btn--active")
            );
            btn.classList.add("buttons__menu-filter-btn--active");

            const newFilter = btn.textContent;
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("filter", newFilter);
            const newUrl =
                window.location.pathname + "?" + newParams.toString();
            window.history.replaceState({}, "", newUrl);
        });
    });
});
