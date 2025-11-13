import { loadMoreIfNeeded } from "./pizza-cards.js";

let slider;

export function initSlider(lazyLoadHandler) {
    slider = document.querySelector(".menu-content__cards-container");
    const nextBtn = document.querySelector(".menu-slider__btn.next");
    const prevBtn = document.querySelector(".menu-slider__btn.prev");

    nextBtn?.addEventListener("click", () => {
        slider.scrollBy({ left: 352, behavior: "smooth" });
        setTimeout(() => lazyLoadHandler(slider), 600);
    });

    prevBtn?.addEventListener("click", () =>
        slider.scrollBy({ left: -352, behavior: "smooth" })
    );

    slider.addEventListener("scroll", () => lazyLoadHandler(slider));
}

export function checkLazyLoad() {
    loadMoreIfNeeded(slider);
}
