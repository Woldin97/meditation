const burger = document.querySelector(".section-header__burger");
const headerNav = document.querySelector(".section-header__nav");
const body = document.querySelector("body");

burger.onclick = () => {
    burger.classList.toggle("active");
    headerNav.classList.toggle("active");
    body.classList.toggle("lock");
}

headerNav.onclick = () => {
    burger.classList.toggle("active");
    headerNav.classList.toggle("active");
    body.classList.toggle("lock");
}