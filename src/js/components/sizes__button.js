import * as v from "../vars.js";
import * as cb from "./colors__button.js";
let sizesBtn;

// F(s)
// **
function toggleActiveClassInCard(btn, prodCard) {
  const activeSizeBtns = prodCard.querySelectorAll(".sizes__button--active");

  const newSize = btn.getAttribute("data-size");
  const newSizeBtns = prodCard.querySelectorAll(`[data-size=${newSize}]`);

  const sizeSelectList = v.$productCard.querySelector(".custom-select__list");
  const newSizeSelected = sizeSelectList.querySelector(`[data-size-select="${newSize}"]`);
  
  activeSizeBtns.forEach(el => {
    el.classList.remove("sizes__button--active");
  });
  
  newSizeBtns.forEach(el => {
    el.classList.add("sizes__button--active");
  });

  newSizeSelected.click();
  newSizeSelected.click();
}

// **
function toggleActiveClass() {
  const sizes = this.closest(".sizes");
  const productCard = this.closest(".product-card");

  if (productCard) {
    toggleActiveClassInCard(this, productCard);

  } else {
    sizes.querySelector(".sizes__button--active").classList.remove("sizes__button--active");
    this.classList.add("sizes__button--active");
  }

  cb.$rechargeProductButton(this);
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