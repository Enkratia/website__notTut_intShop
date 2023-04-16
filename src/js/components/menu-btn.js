const menuBtn = document.querySelector("#menu-btn");
const headerMainContainer = document.querySelector("#header-main-container");
const searchForm = headerMainContainer.querySelector("#search-form");
const navList = headerMainContainer.querySelector("#nav-list");

// F(s)
function showMenu() {
  this.classList.toggle("menu-btn--show");

  headerMainContainer.classList.toggle("header-main__container--show");
  searchForm.classList.toggle("search-form--show");
  navList.classList.toggle("nav__list--show");
}

// L(s)
menuBtn.addEventListener("click", showMenu);