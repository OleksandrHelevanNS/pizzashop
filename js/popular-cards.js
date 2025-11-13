import {pizzas} from "./mocks.js";
import {openModal} from "./pizza-modal.js";

export function initPopularPizzas() {
    const popularContainer = document.querySelector(
        ".menu-section__popular-pizzas-container"
    );
    const cards = [];
    const topPizzas = pizzas
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    topPizzas.forEach((pizza, index) => {
        const card = document.createElement("div");
        card.classList.add("popular-pizzas-container__pizza-card");
        if (index === 0) card.classList.add("pizza-card--best");
        card.innerHTML = `
            <p class="pizza-card__rating-mark">#${index + 1}</p>
            <img src="${pizza.image}" alt="${pizza.name}" class="pizza-card__img"/>
            <p class="pizza-card__pizza-name">${pizza.name}</p>
            <p class="pizza-card__ingredients">Filling: ${pizza.ingredients.join(", ")}...</p>
            <div class="pizza-card__sizes">
                <p class="pizza-card__size">22</p>
                <p class="pizza-card__size pizza-card__size--active">28</p>
                <p class="pizza-card__size">33</p>
            </div>
            <button class="pizza-card__ingredients-btn">+ Ingredients</button>
            <div class="pizza-card__bottom-block">
                <p class="pizza-card__pizza-price">${pizza.price.toFixed(2)}<span>$</span></p>
                <div class="pizza-card__pizza-calculator">
                    <div class="pizza-calculator__remove">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="white"
                        viewBox="0 -960 960 960" width="24px">
                        <path d="M240-440v-80h480v80H240Z"/></svg>
                    </div>
                    <p class="pizza-calculator__total">1</p>
                    <div class="pizza-calculator__add">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="white"
                        viewBox="0 -960 960 960" width="24px">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </div>
                </div>
            </div>
            <button class="pizza-card__order-now">Order Now</button>
        `;
        card.querySelector(".pizza-card__ingredients-btn")
            .addEventListener("click", () => openModal(pizza));
        cards.push(card);
    });

    [cards[0], cards[1]] = [cards[1], cards[0]];
    cards.forEach((card) => popularContainer.appendChild(card));

}
