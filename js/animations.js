document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".popular-pizzas-banner__title");
    if (!title) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    title.classList.add("visible");
                } else {
                    title.classList.remove("visible");
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    observer.observe(title);
});
