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


document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.querySelector('.nav__indicator');
    const links = document.querySelectorAll('.nav__link');

    function updateIndicator(link) {
        const rect = link.getBoundingClientRect();
        const parentRect = link.closest('.nav__list').getBoundingClientRect();
        indicator.style.left = `${rect.left - parentRect.left + rect.width / 2 - 3}px`; // центр крапки
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            links.forEach(l => l.classList.remove('nav__link--active'));
            e.target.classList.add('nav__link--active');
            updateIndicator(e.target);
        });
    });

    const activeLink = document.querySelector('.nav__link--active');
    if (activeLink) updateIndicator(activeLink);
});
