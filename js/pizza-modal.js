const modal = document.createElement("div");
modal.classList.add("pizza-modal");
modal.innerHTML = `
    <div class="pizza-modal__overlay"></div>
    <div class="pizza-modal__content">
        <button class="pizza-modal__close">
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e3e3e3">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button>
        
        <div class="pizza-modal__right-block">
            <img src="" alt="pizza" class="pizza-modal__img">
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
                <p class="pizza-size">22</p>
                <p class="pizza-size pizza-size--active">28</p>
                <p class="pizza-size">33</p>
            </div>
               <button class="pizza-modal__order">Add to Cart</button>
        </div>
     </div>
`;
document.body.appendChild(modal);

const overlay = modal.querySelector(".pizza-modal__overlay");
const closeBtn = modal.querySelector(".pizza-modal__close");

export function openModal(pizza) {
    modal.classList.add("open");
    document.body.classList.add("modal-open");

    modal.querySelector(".pizza-modal__img").src = pizza.image;
    modal.querySelector(".pizza-modal__title").textContent = pizza.name;

    const ingContainer = modal.querySelector(".pizza-modal__ingredients");
    ingContainer.innerHTML = pizza.ingredients
        .map(
            (ing) => `
            <label class="modal-ing__item">
                <input type="checkbox" checked>
                ${ing}
            </label>`
        )
        .join("");

    const total = modal.querySelector(".calc-total");
    const plus = modal.querySelector(".calc-btn.plus");
    const minus = modal.querySelector(".calc-btn.minus");
    total.textContent = "1";
    plus.onclick = () => (total.textContent = +total.textContent + 1);
    minus.onclick = () => (total.textContent = Math.max(1, +total.textContent - 1));
}

function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
}

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
