document.addEventListener("DOMContentLoaded", () => {
    const pizzas = [
        {
            name: "Italian",
            type: "Meat",
            ingredients: ["onion", "potato", "tomato", "mushrooms", "cheese", "olives", "meat"],
            price: 8.35,
            image: "img/pizzas/pizza_img_1.png",
            rating: 8.5
        },
        {
            name: "Venecia",
            type: "Vegetarian",
            ingredients: ["onion", "potato", "tomato", "mushrooms", "cheese", "olives"],
            price: 7.35,
            image: "img/pizzas/pizza_img_2.png",
            rating: 9.3
        },
        {
            name: "Meat",
            type: "Meat",
            ingredients: ["tomato sauce", "onion", "bell pepper", "mozzarella", "beef", "salami"],
            price: 9.35,
            image: "img/pizzas/pizza_img_3.png",
            rating: 7.8
        },
        {
            name: "Cheese",
            type: "Vegetarian",
            ingredients: ["mozzarella", "cheddar", "parmesan", "gorgonzola", "tomato"],
            price: 8.35,
            image: "img/pizzas/pizza_img_4.png",
            rating: 8.9
        },
        {
            name: "Seafood",
            type: "Sea products",
            ingredients: ["tomato sauce", "mozzarella", "shrimp", "squid", "garlic", "olive oil"],
            price: 10.95,
            image: "img/pizzas/pizza_img_5.png",
            rating: 7.3
        },
        {
            name: "Mushrooms",
            type: "Mushroom",
            ingredients: ["mushrooms", "mozzarella", "white sauce", "onion", "parsley"],
            price: 8.95,
            image: "img/pizzas/pizza_img_6.png",
            rating: 6.8
        },
        {
            name: "Pepperoni",
            type: "Meat",
            ingredients: ["tomato sauce", "mozzarella", "pepperoni", "oregano"],
            price: 9.75,
            image: "img/pizzas/pizza_img_7.png",
            rating: 9.2
        },
        {
            name: "Hawaiian",
            type: "Meat",
            ingredients: ["tomato sauce", "mozzarella", "ham", "pineapple", "cheese"],
            price: 9.15,
            image: "img/pizzas/pizza_img_8.png",
            rating: 7.1
        },

    ];

    const pizzaTypeFilter = ["Show All", "Meat", "Vegetarian", "Sea products", "Mushroom"];

    const buttonsContainer = document.querySelector(".menu-content__buttons");
    const cardsTrack = document.querySelector(".menu-content__cards-track");

    const params = new URLSearchParams(window.location.search);
    let currentFilter = params.get("filter") || "Show All";

    pizzaTypeFilter.forEach((type) => {
        const btn = document.createElement("button");
        btn.classList.add("buttons__menu-filter-btn");
        btn.textContent = type;

        if (type === currentFilter) btn.classList.add("buttons__menu-filter-btn--active");

        btn.addEventListener("click", () => {
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("filter", type);
            window.history.replaceState({}, "", `?${newParams.toString()}`);

            document.querySelectorAll(".buttons__menu-filter-btn").forEach((b) =>
                b.classList.remove("buttons__menu-filter-btn--active")
            );
            btn.classList.add("buttons__menu-filter-btn--active");

            renderCards(type);
        });

        buttonsContainer.appendChild(btn);
    });

    function renderCards(filterType) {
        cardsTrack.innerHTML = "";

        const filteredPizzas =
            filterType === "Show All" ? pizzas : pizzas.filter((p) => p.type === filterType);

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
                    <p class="pizza-card__pizza-price">${pizza.price.toFixed(2)}<span>$</span></p>

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


            cardsTrack.appendChild(card);
        });
    }

    renderCards(currentFilter);

    const slider = document.querySelector(".menu-content__cards-container");
    const nextBtn = document.querySelector(".menu-slider__btn.next");
    const prevBtn = document.querySelector(".menu-slider__btn.prev");

    nextBtn.addEventListener("click", () => {
        slider.scrollBy({left: 352, behavior: "smooth"});
    });

    prevBtn.addEventListener("click", () => {
        slider.scrollBy({left: -352, behavior: "smooth"});
    });

    const popularContainer = document.querySelector(".menu-section__popular-pizzas-container");

    const cards = [];
    const topPizzas = pizzas.sort((a, b) => b.rating - a.rating).slice(0, 3);

    topPizzas.forEach((pizza, index) => {
        const card = document.createElement("div");
        card.classList.add("popular-pizzas-container__pizza-card");
        if (index === 0) card.classList.add("pizza-card--best");

        card.innerHTML = `
            <p class="pizza-card__rating-mark">#${index + 1} [${pizza.rating}]</p>
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

        cards.push(card);
    });
    [cards[0], cards[1]] = [cards[1], cards[0]];
    cards.forEach(card => {
        popularContainer.appendChild(card);
    })
});

