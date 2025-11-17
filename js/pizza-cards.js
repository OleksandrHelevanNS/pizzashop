import { LOAD_STEP } from "./constants.js";
import { openModal } from "./pizza-modal.js";
import { initSlider, checkLazyLoad } from "./pizza-slider.js";
import { ingredients as allIngredients } from "./mocks.js";

let cardsTrack;
let loadedCount = 0;
let currentPizzas = [];

export function initPizzaCards() {
    cardsTrack = document.querySelector(".menu-content__cards-track");
    initSlider(checkLazyLoad);
}

export function resetCards(filteredPizzas) {
    currentPizzas = filteredPizzas;
    cardsTrack.innerHTML = "";
    loadedCount = 0;
}

export function renderNextBatch() {
    const batch = currentPizzas.slice(loadedCount, loadedCount + LOAD_STEP);
    loadedCount += batch.length;

    batch.forEach(pizza => {
        const card = document.createElement("div");
        card.classList.add("cards-container__pizza-card");

        let tempIngredients = [...pizza.ingredients];
        let tempSize = 28;
        let tempQty = 1;

        const dropdownHtml = allIngredients
            .map(ing => `
                <label class="dropdown-ing-item">
                    <input type="checkbox" data-ing="${ing}" 
                        ${tempIngredients.includes(ing) ? "checked" : ""}>
                    ${ing}
                </label>
            `)
            .join("");

        card.innerHTML = `
            <img src="${pizza.image}" class="pizza-card__img" alt="pizza-card">
            <p class="pizza-card__pizza-name">${pizza.name}</p>

            <p class="pizza-card__ingredients line-clamp">
                Filling: ${tempIngredients.join(", ")}...
            </p>

            <div class="pizza-card__sizes">
                <p class="pizza-card__size" data-size="22">22</p>
                <p class="pizza-card__size pizza-card__size--active" data-size="28">28</p>
                <p class="pizza-card__size" data-size="33">33</p>
            </div>

            <button class="pizza-card__ingredients-btn">+ Ingredients</button>
            <div class="pizza-card__ingredients-dropdown hidden">
                ${dropdownHtml}
            </div>
            <div class="pizza-card__bottom-block">
                <p class="pizza-card__pizza-price">${pizza.price}$</p>

                <div class="pizza-card__pizza-calculator">
                    <p class="pizza-calculator__remove">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="white"
                        viewBox="0 -960 960 960" width="24px">
                        <path d="M240-440v-80h480v80H240Z"/></svg>
                    </p>
                    <p class="pizza-calculator__total">1</p>
                    <p class="pizza-calculator__add">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="white"
                        viewBox="0 -960 960 960" width="24px">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </p>
                </div>
            </div>
            <button class="pizza-card__order-now">Order Now</button>
        `;

        card.querySelectorAll(".pizza-card__size").forEach(el => {
            el.onclick = () => {
                card.querySelector(".pizza-card__size--active")?.classList.remove("pizza-card__size--active");
                el.classList.add("pizza-card__size--active");
                tempSize = +el.dataset.size;
            };
        });

        const qtyEl = card.querySelector(".pizza-calculator__total");

        card.querySelector(".pizza-calculator__add").onclick = () => {
            tempQty++;
            qtyEl.textContent = tempQty;
        };
        card.querySelector(".pizza-calculator__remove").onclick = () => {
            tempQty = Math.max(1, tempQty - 1);
            qtyEl.textContent = tempQty;
        };

        const dropdown = card.querySelector(".pizza-card__ingredients-dropdown");
        const ingBtn = card.querySelector(".pizza-card__ingredients-btn");

        ingBtn.onclick = e => {
            e.stopPropagation();
            dropdown.classList.toggle("hidden");
        };
        dropdown.onclick = e => e.stopPropagation();

        dropdown.querySelectorAll("input").forEach(box => {
            box.onchange = e => {
                const ing = e.target.dataset.ing;

                if (e.target.checked) {
                    if (!tempIngredients.includes(ing)) tempIngredients.push(ing);
                } else {
                    tempIngredients = tempIngredients.filter(i => i !== ing);
                }

                card.querySelector(".pizza-card__ingredients").textContent =
                    `Filling: ${tempIngredients.join(", ")}...`;
            };
        });

        card.querySelector(".pizza-card__order-now").onclick = () => {
            openModal(pizza, {
                size: tempSize,
                quantity: tempQty,
                ingredients: tempIngredients
            });
        };

        cardsTrack.appendChild(card);
    });
}
export function loadMoreIfNeeded(slider) {
    if (
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 100 &&
        loadedCount < currentPizzas.length
    ) {
        renderNextBatch();
    }
}
