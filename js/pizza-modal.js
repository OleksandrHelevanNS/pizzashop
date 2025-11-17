import { PizzaOrder } from "./PizzaOrder.js";

const modal = document.createElement("div");
modal.classList.add("pizza-modal");

modal.innerHTML = `
    <div class="pizza-modal__overlay"></div>
    <div class="pizza-modal__content">

        <button class="pizza-modal__close">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e3e3e3">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 
                224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </button>

        <div class="pizza-modal__right-block">
            <img class="pizza-modal__img" src="" />
            <h3 class="pizza-modal__title"></h3>

            <div class="pizza-modal__calc">
                <button class="calc-btn minus">−</button>
                <span class="calc-total">1</span>
                <button class="calc-btn plus">+</button>
            </div>
        </div>

        <div class="pizza-modal__left-block">
            <div class="pizza-modal__ingredients"></div>

            <div class="pizza-modal__sizes">
                <p class="pizza-size" data-size="22">22</p>
                <p class="pizza-size pizza-size--active" data-size="28">28</p>
                <p class="pizza-size" data-size="33">33</p>
            </div>

            <button class="pizza-modal__order">Add to Cart</button>
        </div>
    </div>
`;

document.body.appendChild(modal);

const overlay = modal.querySelector(".pizza-modal__overlay");
const closeBtn = modal.querySelector(".pizza-modal__close");

let currentOrder = null;

export function openModal(pizza, existingState = null) {
    modal.classList.add("open");
    document.body.classList.add("modal-open");

    currentOrder = new PizzaOrder(pizza);

    if (existingState?.size) currentOrder.size = existingState.size;
    if (existingState?.quantity) currentOrder.quantity = existingState.quantity;
    if (existingState?.ingredients) currentOrder.ingredients = [...existingState.ingredients];

    modal.querySelector(".pizza-modal__img").src = currentOrder.image;
    modal.querySelector(".pizza-modal__title").textContent = currentOrder.name;

    const ingContainer = modal.querySelector(".pizza-modal__ingredients");
    ingContainer.innerHTML = currentOrder.ingredients
        .map(ing => `
            <label class="modal-ing__item">
                <input type="checkbox" checked data-ing="${ing}">
                ${ing}
            </label>
        `)
        .join("");
    ingContainer.querySelectorAll("input").forEach(box => {
        box.onchange = (e) => {
            const ing = e.target.dataset.ing;
            if (e.target.checked) currentOrder.addIngredient(ing);
            else currentOrder.removeIngredient(ing);
        };
    });
    const qtyEl = modal.querySelector(".calc-total");
    qtyEl.textContent = currentOrder.quantity;

    modal.querySelector(".plus").onclick = () => {
        currentOrder.incQty();
        qtyEl.textContent = currentOrder.quantity;
    };
    modal.querySelector(".minus").onclick = () => {
        currentOrder.decQty();
        qtyEl.textContent = currentOrder.quantity;
    };
    modal.querySelectorAll(".pizza-size").forEach(sizeEl => {
        sizeEl.onclick = () => {
            modal.querySelector(".pizza-size--active")?.classList.remove("pizza-size--active");
            sizeEl.classList.add("pizza-size--active");

            currentOrder.setSize(+sizeEl.dataset.size);
        };
    });
}

function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
}

overlay.onclick = closeModal;
closeBtn.onclick = closeModal;
