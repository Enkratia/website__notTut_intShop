import * as v from "../vars.js";
import * as pbc from "./product__button-cart.js";

// F(s)
// **
function removeProductBtnActiveClass() {
  document.querySelectorAll(".product__button-cart--active").forEach(el => {
    el.classList.remove("product__button-cart--active");
    el.removeEventListener("click", pbc.$clickOnCart);
  });

  const productCardBtn = document.querySelector(".product-card__btn-cart--active");

  if (productCardBtn) {
    productCardBtn.classList.remove("product-card__btn-cart--active");
    productCardBtn.removeEventListener("click", pbc.$clickOnCart);
  }
}

// **
function closeCart() {
  const cart = this.closest(".cart");
  cart.classList.remove("cart--open");
  document.body.classList.remove("overflow-hidden");
  removeProductBtnActiveClass();
}

// **
function openCart() {
  const cart = this.parentElement;
  cart.classList.add("cart--open");
  document.body.classList.add("overflow-hidden");
}

// L(s)
// **
v.$cartBtn.addEventListener("click", openCart);

// **
v.$cartClose.addEventListener("click", closeCart);

