const burger = document.getElementById('burger');
const navList = document.querySelector('.nav__list');
const login = document.getElementById('login');
const headerActions = document.querySelector('.header__actions');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navList.classList.toggle('nav__list--open');

    if (burger.classList.contains('active')) {
        const loginItem = document.createElement('li');
        loginItem.classList.add('nav__item', 'nav__item--login');
        loginItem.appendChild(login);
        navList.appendChild(loginItem);
    } else {
        headerActions.prepend(login);
        document.querySelector('.nav__item--login')?.remove();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        headerActions.prepend(login);
        document.querySelector('.nav__item--login')?.remove();
        navList.classList.remove('nav__list--open');
        burger.classList.remove('active');
    }
});
