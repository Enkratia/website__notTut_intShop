import * as v from "../vars.js";

const cartArray = JSON.parse(localStorage.getItem("cartArray")) ?? [];

// F(s)
// **
function writeTheCount() {
  v.$headerCartCount.innerText = cartArray.length;
  v.$headerCartCount.classList.add("cart__count--show");
}

// **
function markAddedToCartInit() {
  if (cartArray.length > 0) {
    const vendorElements = document.querySelectorAll("[data-vendor]");
    writeTheCount();

    vendorElements.forEach(el => {
      const vendorCode = el.getAttribute("data-vendor");

      if (cartArray.includes(vendorCode)) {
        const productCartBtn = el.querySelector(".product__button-cart");
        productCartBtn.toggleAttribute("disabled");
      }
    });
  }
}
markAddedToCartInit();

// **
function addToCart() {
  this.setAttribute("disabled", "");

  const vendorElement = this.closest("[data-vendor]");
  const vendorCode = vendorElement.getAttribute("data-vendor");
  cartArray.push(vendorCode);
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  writeTheCount();
}

// L(s)
v.$productCartBtns.forEach(el => {
  el.addEventListener("click", addToCart);
});