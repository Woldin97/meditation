const burger = document.querySelector(".section-header__burger");
const headerNav = document.querySelector(".section-header__nav");

burger.onclick = () => {
    burger.classList.toggle("active");
    headerNav.classList.toggle("active");
}

headerNav.onclick = () => {
    burger.classList.toggle("active");
    headerNav.classList.remove("active");
}