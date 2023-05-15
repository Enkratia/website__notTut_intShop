import * as v from "../vars.js";

// For product
// F(s)
// **
function rechargeProductButton(elem) {
  const product = elem.closest(".product");
  const productCard = elem.closest(".product-card");

  if (productCard) {
    const productButton = product.querySelector(".product__button-cart");
    productButton.classList.remove("product-card__btn-cart--active");
    return;

  } else if (product) {
    const productButton = product.querySelector(".product__button-cart");
    productButton.classList.remove("product__button-cart--active");
  }
}

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

  rechargeProductButton(this);
}

// L(s)
// **
const productColorsBtns = document.querySelectorAll(".product .colors__button"); // (Не убирать в vars)
productColorsBtns.forEach(el => {
  el.addEventListener("click", toggleActiveClass);
});