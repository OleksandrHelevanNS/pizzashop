document.addEventListener("DOMContentLoaded", () => {
    const pizzas = [
        {
            name: "Italian",
            type: "Meat",
            ingredients: ["onion", "potato", "tomato", "mushrooms", "cheese", "olives", "meat"],
            price: 8.35,
            image: "img/pizzas/pizza_img_1.png",
        },
        {
            name: "Venecia",
            type: "Vegetarian",
            ingredients: ["onion", "potato", "tomato", "mushrooms", "cheese", "olives"],
            price: 7.35,
            image: "img/pizzas/pizza_img_2.png",
        },
        {
            name: "Meat",
            type: "Meat",
            ingredients: ["tomato sauce", "onion", "bell pepper", "mozzarella", "beef", "salami"],
            price: 9.35,
            image: "img/pizzas/pizza_img_3.png",
        },
        {
            name: "Cheese",
            type: "Vegetarian",
            ingredients: ["mozzarella", "cheddar", "parmesan", "gorgonzola", "tomato sauce"],
            price: 8.35,
            image: "img/pizzas/pizza_img_4.png",
        },
        {
            name: "Seafood",
            type: "Sea products",
            ingredients: ["tomato sauce", "mozzarella", "shrimp", "squid", "garlic", "olive oil"],
            price: 10.9,
            image: "img/pizzas/pizza_img_5.png",
        },
        {
            name: "Mushrooms",
            type: "Mushroom",
            ingredients: ["mushrooms", "mozzarella", "white sauce", "onion", "parsley"],
            price: 8.95,
            image: "img/pizzas/pizza_img_6.png",
        },
        {
            name: "Pepperoni",
            type: "Meat",
            ingredients: ["tomato sauce", "mozzarella", "pepperoni", "oregano"],
            price: 9.75,
            image: "img/pizzas/pizza_img_7.png",
        },
        {
            name: "Hawaiian",
            type: "Meat",
            ingredients: ["tomato sauce", "mozzarella", "ham", "pineapple", "cheese"],
            price: 9.15,
            image: "img/pizzas/pizza_img_8.png",
        },

    ];

    const pizzaTypeFilter = [
        "Show All",
        "Meat",
        "Vegetarian",
        "Sea products",
        "Mushroom",
    ];

    const buttonsContainer = document.querySelector(".menu-content__buttons");
    const cardsContainer = document.querySelector(".menu-content__cards-container");

    const params = new URLSearchParams(window.location.search);
    let currentFilter = params.get("filter") || "Show All";

    pizzaTypeFilter.forEach((type) => {
        const btn = document.createElement("button");
        btn.classList.add("buttons__menu-filter-btn");
        btn.textContent = type;

        if (type === currentFilter) {
            btn.classList.add("buttons__menu-filter-btn--active");
        }

        btn.addEventListener("click", () => {
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("filter", type);
            window.history.replaceState({}, "", `?${newParams.toString()}`);

            document.querySelectorAll(".buttons__menu-filter-btn").forEach((b) => {
                b.classList.remove("buttons__menu-filter-btn--active");
            });
            btn.classList.add("buttons__menu-filter-btn--active");

            renderCards(type);
        });

        buttonsContainer.appendChild(btn);
    });

    function renderCards(filterType) {
        cardsContainer.innerHTML = "";

        const filteredPizzas =
            filterType === "Show All"
                ? pizzas
                : pizzas.filter((p) => p.type === filterType);

        filteredPizzas.forEach((pizza) => {
            const card = document.createElement("div");
            card.classList.add("cards-container__pizza-card");

            card.innerHTML = `
                <img src="${pizza.image}" alt="${pizza.name}" class="pizza-card__img"/>

                <p class="pizza-card__pizza-name">${pizza.name}</p>
                <p class="pizza-card__ingredients">
                    Filling: ${pizza.ingredients.join(", ")}...
                </p>

                <div class="pizza-card__sizes">
                    <p class="pizza-card__size">22</p>
                    <p class="pizza-card__size pizza-card__size--active">28</p>
                    <p class="pizza-card__size">33</p>
                </div>

                <button class="pizza-card__ingredients-btn">+ Ingredients</button>

                <div class="pizza-card__bottom-block">
                    <p class="pizza-card__pizza-price">${pizza.price}<span>$</span></p>

                    <div class="pizza-card__pizza-calculator">
                        <p class="pizza-calculator__remove">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="white"
                                 viewBox="0 -960 960 960" width="24px">
                                <path d="M240-440v-80h480v80H240Z"/>
                            </svg>
                        </p>
                        <p class="pizza-calculator__total">1</p>
                        <p class="pizza-calculator__add">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="white"
                                 viewBox="0 -960 960 960" width="24px">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                            </svg>
                        </p>
                    </div>
                </div>

                <button class="pizza-card__order-now">Order Now</button>
            `;

            cardsContainer.appendChild(card);
        });
    }

    renderCards(currentFilter);
});
