import * as pbc from "./product__button-cart.js";
let sizesBtn;

// F(s)
// **
function rechargeProductButton(elem) {
  const product = elem.closest(".product");

  if (product) {
    const productButton = product.querySelector(".product__button-cart");
    productButton.classList.remove("product__button-cart--active");
    productButton.removeEventListener("click", pbc.$clickOnCart);
  }
}

// **
function toggleActiveClass() {
  const sizes = this.closest(".sizes");
  sizes.querySelector(".sizes__button--active").classList.remove("sizes__button--active");
  this.classList.add("sizes__button--active");
  rechargeProductButton(this);
}

// L(s)
// **
setTimeout(() => { // Wait swiper js
  sizesBtn = document.querySelectorAll(".sizes__button");

  sizesBtn.forEach(el => {
    el.addEventListener("click", toggleActiveClass);
  });
}, 50);

// **
window.addEventListener("resize", () => {
  setTimeout(() => { // Wait swiper js
    sizesBtn = document.querySelectorAll(".swiper-wrapper .sizes__button");

    sizesBtn.forEach(el => {
      el.addEventListener("click", toggleActiveClass);
    });
  }, 50);
});