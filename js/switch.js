document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".switch__btn");
    const slider = document.querySelector(".switch__slider");

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("switch__btn--active"));
            btn.classList.add("switch__btn--active");

            slider.style.transform = `translateX(${index * 100}%)`;
        });
    });
});
