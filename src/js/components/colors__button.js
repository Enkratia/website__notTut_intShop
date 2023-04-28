import * as v from "../vars";

// For product
// F(s)
function toggleActiveClass() {
  this.closest(".colors").querySelector(".colors__button--active").classList.remove("colors__button--active");
  this.classList.add("colors__button--active");
}

// L(s)
v.$productColorsBtns.forEach(el => {
  el.addEventListener("click", toggleActiveClass);
});