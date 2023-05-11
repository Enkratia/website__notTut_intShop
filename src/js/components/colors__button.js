import * as v from "../vars.js";

// For product
// F(s)
// **
function writeColorName(btn, colors) {
  const colorNameElement = colors.querySelector(".product-card__colors-item--name");
  const colorName = btn.getAttribute("data-color");
  colorNameElement.innerText = colorName;
}

// **
function toggleActiveClass() {
  const colors = this.closest(".colors");
  colors.querySelector(".colors__button--active").classList.remove("colors__button--active");
  this.classList.add("colors__button--active");

  if (this.parentElement.classList.contains("product-card__colors-item")) {
    writeColorName(this, colors);
  }
}

// L(s)
// **
v.$productColorsBtns.forEach(el => {
  el.addEventListener("click", toggleActiveClass);
});