const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("nav__link--active"));
        link.classList.add("nav__link--active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav__link");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offset = 88;
                const topPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: topPosition,
                    behavior: "smooth"
                });

                navLinks.forEach(l => l.classList.remove("nav__link--active"));
                link.classList.add("nav__link--active");
            }
        });
    });
});
