import * as v from "../vars.js";

const cartChoice = document.querySelector(".cart__choice");

// F(s)
// **
function closeCart() {
  const cart = this.closest(".cart");
  cart.classList.remove("cart--open");
  document.body.classList.remove("overflow-hidden");
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