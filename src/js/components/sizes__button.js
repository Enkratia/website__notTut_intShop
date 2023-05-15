const sizesBtn = document.querySelectorAll(".sizes__button");

// F(s)
// **
function rechargeProductButton(elem) {
  const product = elem.closest(".product");

  if (product) {
    const productButton = product.querySelector(".product__button-cart");
    productButton.classList.remove("product__button-cart--active");
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
sizesBtn.forEach(el => {
  el.addEventListener("click", toggleActiveClass);
});