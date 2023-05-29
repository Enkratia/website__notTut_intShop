import * as pbc from "./product__button-cart.js";
export { rechargeProductButton as $rechargeProductButton }
let productColorsBtns;


// For product
// F(s)
// **
function toggleActiveClassInCard(btn, prodCard) {
  const activeColorBtns = prodCard.querySelectorAll(".colors__button--active");

  activeColorBtns.forEach(el => {
    el.classList.remove("colors__button--active");
  });

  const newColor = btn.getAttribute("data-color");
  const newColorBtns = prodCard.querySelectorAll(`[data-color=${newColor}]`);
  
  newColorBtns.forEach(el => {
    el.classList.add("colors__button--active");
  });
}

// **
function rechargeProductCardButton(prodCard) {
  const productBtns = prodCard.querySelectorAll(".product__button-cart");

  productBtns.forEach(el => {
    if (el.classList.contains("product-card__btn-cart")) {
      el.classList.remove("product-card__btn-cart--active");
    } else {
      el.classList.remove("product__button-cart--active");
    }

    el.removeEventListener("click", pbc.$clickOnCart);
  });
}

// ***
function rechargeProductButton(elem) {
  const product = elem.closest(".product");
  const productCard = elem.closest(".product-card");

  if (productCard) {
    rechargeProductCardButton(productCard);

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

// ***
function toggleActiveClass() {
  const colors = this.closest(".colors");
  const productCard = this.closest(".product-card");

  if (productCard) {
    toggleActiveClassInCard(this, productCard);

    if (this.parentElement.classList.contains("product-card__colors-item")) {
      writeColorName(this, colors);
    }

  } else {
    colors.querySelector(".colors__button--active").classList.remove("colors__button--active");
    this.classList.add("colors__button--active");
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