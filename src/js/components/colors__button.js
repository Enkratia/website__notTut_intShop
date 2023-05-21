import * as pbc from "./product__button-cart.js";
let productColorsBtns;

// For product
// F(s)
// **
function rechargeProductButton(elem) {
  const product = elem.closest(".product");
  const isProductCard = elem.classList.contains("product-card__color-btn");

  if (isProductCard) {
    const productButton = product.querySelector(".product__button-cart");
    productButton.classList.remove("product-card__btn-cart--active");
    productButton.removeEventListener("click", pbc.$clickOnCart);

    return;

  } else if (product) {
    const productButton = product.querySelector(".product__button-cart");
    productButton.classList.remove("product__button-cart--active");
    productButton.removeEventListener("click", pbc.$clickOnCart);
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
setTimeout(() => {
  productColorsBtns = document.querySelectorAll(".product .colors__button"); // (Не убирать в vars)
  productColorsBtns.forEach(el => {
    el.addEventListener("click", toggleActiveClass);
  });
}, 50);

// **
window.addEventListener("resize", () => {
  setTimeout(() => {
    productColorsBtns = document.querySelectorAll(".swiper-wrapper .product .colors__button"); // (Не убирать в vars)
    productColorsBtns.forEach(el => {
      el.addEventListener("click", toggleActiveClass);
    });
  }, 50);
});